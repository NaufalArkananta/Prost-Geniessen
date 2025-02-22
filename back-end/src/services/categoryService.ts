import { CategoryModel } from "../models/categoryModel";

interface CategoryData {
    name: string;
    description: string;
}

export class CategoryService {
    static async findAll() {
        const categories = await CategoryModel.findAll()
        if(!categories) throw new Error('Categories not found')
        
        return categories
    }

    static async createCategory({name,description}: CategoryData) {
        const slug = name.replace(/\s+/g, '-').toLowerCase();
        const data = {name, slug, description}
        const category = await CategoryModel.createCategory(data)
        if(!category) throw new Error('Category not created')

        return category
    }

    static async findById(id: string) {
        const category = await CategoryModel.findById(id)
        if(!category) throw new Error('Category not found')        
        
        return category
    }

    static async update(id: string, {name, description}: CategoryData) {
        const slug = name.replace(/\s+/g, '-').toLowerCase();
        const data = {name, slug, description}
        const category = await CategoryModel.update(id, data)
        if(!category) throw new Error('Category not updated')        
        
        return category
    }

    static async delete(id: string) {
        const category = await CategoryModel.delete(id)
        if(!category) throw new Error('Category not deleted')        
        
        return category
    }
}