import { CartModel } from "../models/cartModel";

export class CartService  {
    static async getCart(userId: string) {
        const cart = await CartModel.findCartByUserId(userId);
        if (!cart) return

        return cart
    }

    static async findCartById(userId: string) {
        return await CartModel.findCartByUserId(userId);
    }

    static async createCart(userId: string) {
        return await CartModel.createCart(userId);
    }

    static async addToCart(userId: string, productId: string, quantity: number, price: number) {
        try {
            // Validasi quantity dan price
            if (quantity <= 0 || price <= 0) {
                throw new Error("Quantity and price must be greater than 0");
            }
    
            // Cari keranjang berdasarkan userId
            let cart = await CartModel.findCartByUserId(userId);
    
            // Jika keranjang tidak ditemukan, buat keranjang baru
            if (!cart) {
                cart = await CartModel.createCart(userId);
            }
    
            // Hitung subtotal
            const subtotal = quantity * price;
    
            // Tambahkan item ke keranjang
            const cartItem = await CartModel.addToCart(cart.id, productId, quantity, price, subtotal);
    
            // Kembalikan cartItem
            return cartItem;
        } catch (error) {
            console.error("Error in addToCart:", error);
            throw error; // Lempar error ke caller
        }
    }

    static async checkout(userId: string) {
        const cart = await CartModel.findCartByUserId(userId);
        if (!cart || cart.cartItems.length === 0) return


    }

    static async deleteItems(ids: string[]) {
        try {
            // Hapus item-item yang memiliki id yang sesuai
            const deleteResult = await CartModel.deleteItems(ids);
            return deleteResult;
        } catch (error) {
            return
        }
    }

    static async findCartItem(userId: string, productId: string, ) {
        return await CartModel.findCartItem(userId, productId);
    }

    static async updateCartItem(cartId: string, productId: string, quantity: number, price: number) {
        try {
            // Cari CartItem berdasarkan cartId dan productId
            const cartItem = await CartModel.findCartItem(cartId, productId);

            // Jika CartItem tidak ditemukan, lempar error
            if (!cartItem) {
                return
            }

            // Hitung subtotal
            const subtotal = quantity * price;

            // Update CartItem
            const updatedCartItem = await CartModel.updateCartItem(
                cartItem.id, // Gunakan id yang ditemukan
                quantity,
                price,
                subtotal
            );

            return updatedCartItem;
        } catch (error) {
            console.error("Error updating cart item:", error);
            return
        }
    }
    
};
