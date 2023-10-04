import express from "express"
const router = express.Router();
import {register,tokenTest} from "@controller/userController"

router.post("/register",register);
router.post("/test",tokenTest);
export default router;
