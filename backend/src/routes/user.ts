import express from "express"
const router = express.Router();
import {register,tokenTest,login, logout, getUsers, imageSendTest} from "@controller/userController"
import { checkForRole } from "@utils/authUtils";
import { uploadMiddleware } from "@utils/fileUploadUtils";

router.post("/register",uploadMiddleware('image','userimage'), register);
router.post("/test", checkForRole('professional'), tokenTest);
router.post("/login",login);
router.get("/logout",checkForRole(),logout);
router.post("/users",getUsers);
router.get("/imagetest/:id",imageSendTest);
export default router;
