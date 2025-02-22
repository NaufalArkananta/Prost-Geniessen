import { Request, Response } from 'express';
import { sendResponse } from '../utils/responseHandler';
import { ProductService } from '../services/productService';
import prisma from '../config/database';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductService.findAll();
        sendResponse(res, 200, 'Products retrieved successfully', products);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, alcoholLevel, volume, imageUrl, categoryId } = req.body;
        const newProduct = await ProductService.createProduct({ name, description, price, stock, alcoholLevel, volume, imageUrl, categoryId });
        sendResponse(res, 201, 'Product created successfully', newProduct);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await ProductService.findById(id);
        sendResponse(res, 200, 'Product retrieved successfully', product);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, alcoholLevel, volume, imageUrl, categoryId } = req.body;
        const updatedProduct = await ProductService.update(id, { name, description, price, stock, alcoholLevel, volume, imageUrl, categoryId });
        sendResponse(res, 200, 'Product updated successfully', updatedProduct);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductService.delete(id);
        sendResponse(res, 200, 'Product deleted successfully', deletedProduct);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
}

export const getProductByCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const products = await ProductService.findByCategory(categoryId);

        if (!products || products.length === 0) {
            return sendResponse(res, 404, 'Products not found', []);
        }

        sendResponse(res, 200, 'Products retrieved successfully', products);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
}

export const findByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.query; // Ambil parameter `name` dari query string

        // Validasi: Pastikan `name` ada
        if (!name || typeof name !== 'string') {
            return sendResponse(res, 400, 'Name parameter is required', null);
        }

        // Cari produk berdasarkan nama
        const products = await ProductService.findByName(name);

        // Jika produk ditemukan
        if (products.length > 0) {
            return sendResponse(res, 200, 'Products found successfully', products);
        } else {
            return sendResponse(res, 404, 'No products found', null);
        }
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, 'Internal server error', null);
    }
}
