import express from "express"
const router = express.Router();
import {register,tokenTest,login, logout, getUsers, imageSendTest, viewProfile, forgetPassword} from "@controller/userController"
import { checkForRole } from "@utils/authUtils";
import { uploadMiddleware } from "@utils/fileUploadUtils";

router.post("/register",uploadMiddleware('userimage','image',false), register);
router.post("/test", checkForRole('any','notRequired'), tokenTest);
router.post("/login",login);
router.get("/logout",checkForRole(),logout);
router.post("/users",getUsers);
router.get("/imagetest/:id",imageSendTest);
router.get("/profile/:id",viewProfile);
router.post("/forgetpassword/:email",forgetPassword);
export default router;

checkForRole('any','free')
checkForRole() //Same as checkForRole('any','required')
checkForRole('company')
checkForRole('professional')
checkForRole('admin')
