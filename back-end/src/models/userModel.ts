import prisma from "../config/database";

export const UserModel = {
    findAll: () => prisma.user.findMany(),
    createUser: (data: any) => prisma.user.create({ data }),
    findOne: (username: string) => prisma.user.findUnique({ where: { username } }),
    findById: (id: string) => prisma.user.findUnique({ where: { id } }),
    update: (id: string, data: any) => prisma.user.update({ where: { id }, data }),
    delete: (id: string) => prisma.user.delete({ where: { id } }),
    findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
    showProfile: (id: string) => prisma.user.findUnique({ where: { id }}),
    authentication: (username: string, password: string) => prisma.user.findUnique({where: { username}})
};