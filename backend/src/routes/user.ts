import express from "express"
const router = express.Router();
import {register} from "@controller/userController"

router.post("/register",register);
export default router;
