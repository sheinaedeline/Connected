import express from "express"
const router = express.Router();
import {register,tokenTest,login, logout} from "@controller/userController"
import { checkForRole } from "@utils/authUtils";

router.post("/register",register);
router.post("/test", checkForRole("admin"), tokenTest);
router.post("/login",login);
router.get("/logout",checkForRole(),logout);
export default router;
