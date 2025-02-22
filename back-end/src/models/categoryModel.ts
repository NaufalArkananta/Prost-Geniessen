import prisma from "../config/database";

export const CategoryModel = {
    findAll: () => prisma.category.findMany(),
    createCategory: (data: {name: string, slug: string, description: string}) => prisma.category.create({ data }),
    findOne: (name: string) => prisma.category.findUnique({ where: { name } }),
    findById: (id: string) => prisma.category.findUnique({ where: { id } }),
    update: (id: string, data: {name: string, slug: string, description: string}) => prisma.category.update({ where: { id }, data }),
    delete: (id: string) => prisma.category.delete({ where: { id } }),
};