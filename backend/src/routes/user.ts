import express from "express"
const router = express.Router();
import {register,tokenTest,login, logout, getProfessionalUsers} from "@controller/userController"
import { checkForRole } from "@utils/authUtils";

router.post("/register",register);
router.post("/test",  tokenTest);
router.post("/login",login);
router.get("/logout",checkForRole(),logout);
router.get("/professionalusers",getProfessionalUsers);
export default router;
