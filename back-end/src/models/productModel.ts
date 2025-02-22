import { Prisma } from "@prisma/client";
import prisma from "../config/database";

export const ProductModel = {
    findAll: () => prisma.product.findMany({ 
        include: { 
            category: true 
        } 
    }),
    createProduct: (data: {name:string, description:string, slug:string,price:number, stock:number, alcoholLevel:number, volume:number, imageUrl:string, categoryId: string}) => prisma.product.create({ data }),
    findOne: (id: string) => prisma.product.findUnique({ where: { id } }),
    update: (id: string, data: {name:string, description:string, slug:string,price:number, stock:number, alcoholLevel:number, volume:number, imageUrl:string, categoryId: string}) => prisma.product.update({ where: { id }, data }),
    delete: (id: string) => prisma.product.delete({ where: { id } }),

    findByCategory: (categoryId: string) => prisma.product.findMany({
        where: { categoryId }
    }),
    findByName: (name: string) => prisma.product.findMany({
        where: {
            name: {
                contains:name
            }
        }
    }),
}