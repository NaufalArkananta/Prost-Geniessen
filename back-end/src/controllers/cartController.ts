import { Request, Response } from "express";
import { CartService } from "../services/cartService";
import { sendResponse } from "../utils/responseHandler";
import { ProductService } from "../services/productService";
import { findById } from "../services/userService";

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { productId, quantity, userId } = req.body;

        const user = await findById(userId);
        if (!user) {
            sendResponse(res, 404, "User not found", "");
            return;
        }
        const product = await ProductService.findById(productId);

        if (!product) {
            sendResponse(res, 404, "Product not found", "");
            return;
        }
    
        if (product.stock < quantity) {
            sendResponse(res, 400, "Not enough stock available", "");
            return;
        }

        const price = product.price.toNumber()
        
        // Cek apakah item sudah ada di cart
        const existingCartItem = await CartService.findCartItem(userId, productId);

        let cartItem;
        if (existingCartItem) {
            // Jika produk sudah ada di cart, update quantity dan subtotal
            const newQuantity = existingCartItem.quantity + quantity;
            if (newQuantity > product.stock) {
                sendResponse(res, 400, "Not enough stock available", "");
                return;
            }

            cartItem = await CartService.updateCartItem(userId, productId, newQuantity, price);
        } else {
            // Jika belum ada, tambahkan item baru ke cart
            cartItem = await CartService.addToCart(userId, productId, quantity, price);
        }

        sendResponse(res, 201, "Item added to cart successfully", cartItem);
    } catch (error) {
        console.log(error);
        sendResponse(res, 500, 'Internal server error', "");
    }
};

export const getCart = async (req: Request, res: Response) => {
    try {
        const { userId }  = req.body

        const cart = await CartService.getCart(userId);

        if (!cart) {
            sendResponse(res, 404, "Cart is empty", []);
            return;
        }

        sendResponse(res, 200, "Cart retrieved successfully", cart);
    } catch (error) {
        console.log(error);
        sendResponse(res, 500, 'Internal server error', "");
    }
}

export const deleteItems = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body; // Ambil array `ids` dari body request

        // Validasi: Pastikan `ids` ada dan merupakan array
        if (!ids || !Array.isArray(ids)) {
            return sendResponse(res, 400, "Invalid input: 'ids' must be an array", null);
        }

        // Hapus item-item dari keranjang
        const deleteResult = await CartService.deleteItems(ids);

        // Kirim respons sukses
        sendResponse(res, 200, "Items deleted successfully", deleteResult);
    } catch (error) {
        console.error("Error in deleteItems:", error);
        sendResponse(res, 500, "Internal server error", null);
    }
};