import { Router } from "express";
import { authentication } from "../controllers/userController";

const router = Router()

router.post(`/login`, authentication)

export default router;