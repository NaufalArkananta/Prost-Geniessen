import { Router } from "express";
import { createUser, showProfile, updateUser } from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";
import { createValidation, updateValidation } from "../middleware/userMidleware";

const router = Router()

router.get(`/me`, [verifyToken], showProfile)
router.put(`/me/update/:id`, [verifyToken, updateValidation], updateUser)
router.delete(`/me/delete/:id`, [verifyToken], updateUser)
router.post(`/user/register`, [createValidation], createUser)

export default router;