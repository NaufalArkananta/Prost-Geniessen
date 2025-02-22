import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { addToCart, deleteItems, getCart } from "../controllers/cartController";
import { createCartValidation } from "../middleware/cartMiddleware";

const router = Router();

router.get(`/cart`, [verifyToken], getCart)
router.post(`/cart/create`, [verifyToken, createCartValidation], addToCart)
router.delete('/cart/delete', deleteItems);
router.put('/cart/update', );

export default router;