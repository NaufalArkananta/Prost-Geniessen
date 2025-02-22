import { Router } from "express";
import { createAdmin, getUsers } from "../controllers/userController";
import { createValidation } from "../middleware/userMidleware";
import { createCategoryValidation, updateCategoryValidation } from "../middleware/categoryMiddleware";
import { isAdmin } from "../middleware/isAdminMiddleware";
import { verifyToken } from "../middleware/authMiddleware";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryController";
import { createProduct, deleteProduct, updateProduct } from "../controllers/productController";
import { productCreateValidation, productUpdateValidation } from "../middleware/productMiddleware";

const router = Router()

router.get(`/employees`, [verifyToken, isAdmin], getUsers)
router.post(`/employee/register`, [createValidation], createAdmin)

router.get(`/categories`, [verifyToken, isAdmin], getCategories)
router.get(`/category/:id`, [verifyToken, isAdmin], getCategory)
router.post(`/category/create`, [verifyToken, isAdmin, createCategoryValidation], createCategory)
router.put(`/category/update/:id`, [verifyToken, isAdmin, updateCategoryValidation], updateCategory)
router.delete(`/category/delete/:id`, [verifyToken, isAdmin], deleteCategory)

router.post(`/product/create`, [verifyToken, isAdmin, productCreateValidation], createProduct)
router.put(`/product/update/:id`, [verifyToken, isAdmin, productUpdateValidation], updateProduct)
router.delete(`/product/delete/:id`, [verifyToken, isAdmin], deleteProduct)

export default router;