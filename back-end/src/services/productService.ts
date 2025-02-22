import { ProductModel } from "../models/productModel"

interface ProductData {
    name: string;
    description: string;
    price: number, 
    stock: number, 
    alcoholLevel: number, 
    volume: number, 
    imageUrl:string
    categoryId: string
}


export class ProductService {
    static async findAll() {
        const products = await ProductModel.findAll()
        
        return products
    }

    static async createProduct({name,description, price, stock, alcoholLevel, volume, imageUrl, categoryId}: ProductData) {
        const slug = name.replace(/\s+/g, '-').toLowerCase();
        const data = {name, slug, description, price, stock, alcoholLevel, volume, imageUrl, categoryId}
        const product = await ProductModel.createProduct(data)

        return product
    }

    static async findById(id: string) {
        const product = await ProductModel.findOne(id)
        
        return product
    }

    static async update(id: string, {name, description, price, stock, alcoholLevel, volume, imageUrl, categoryId}: ProductData) {
        const slug = name.replace(/\s+/g, '-').toLowerCase();
        const data = {name, slug, description, price, stock, alcoholLevel, volume, imageUrl, categoryId}
        const product = await ProductModel.update(id, data)
        
        return product
    }

    static async delete(id: string) {
        const product = await ProductModel.delete(id)
        
        return product
    }

    static async findByCategory(categoryId: string) {
        const products = await ProductModel.findByCategory(categoryId)
        
        return products
    }

    static async findByName(name: string) {
        const products = await ProductModel.findByName(name);
    
        return products;
    }
}