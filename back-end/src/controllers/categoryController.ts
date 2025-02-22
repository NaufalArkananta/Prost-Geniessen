import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';
import { sendResponse } from '../utils/responseHandler';

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const category = await CategoryService.createCategory({ name, description });
        sendResponse(res, 201, 'Category created successfully', category);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
}

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryService.findAll();
        sendResponse(res, 200, 'Categories retrieved successfully', categories);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
}

export const getCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await CategoryService.findById(id);
        sendResponse(res, 200, 'Category retrieved successfully', category);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const category = await CategoryService.update(id, { name, description });    
        sendResponse(res, 200, 'Category updated successfully', category);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await CategoryService.delete(id);
        sendResponse(res, 200, 'Category deleted successfully', category);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
}