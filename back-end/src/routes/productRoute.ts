import { Router } from "express";
import { findByName, getProduct, getProductByCategory, getProducts, } from "../controllers/productController";

const router = Router()

router.get(`/products`, getProducts)
router.get(`/product/:id`, getProduct)
router.get(`/product/category/:categoryId`, getProductByCategory)
router.get('/products/search', findByName);

export default router;