import express from "express"
const router = express.Router();
import {register,login, logout,editProfile, getUsers, viewProfile, forgetPassword, uploadCV, rateProfessionalUser, rateProject, getMultipleUserDetail, getReviews} from "@controller/userController"
import { checkForRole } from "@utils/authUtils";
import { uploadMiddleware } from "@utils/fileUploadUtils";

router.post("/register",uploadMiddleware('userimage','image',false), register);
router.post("/login",login);
router.post("/uploadcv",uploadMiddleware('cv','pdf'),checkForRole('professional'),uploadCV);
router.get("/logout",checkForRole(),logout);
router.post("/users",getUsers);
router.post("/editprofile",uploadMiddleware('userimage','image',false),checkForRole(),editProfile);
router.get("/profile/:id",viewProfile);
router.post("/forgetpassword/:email",forgetPassword);
router.post("/rateProfessionalUser", checkForRole('company'), rateProfessionalUser);
router.post("/rateProject", checkForRole('professional'), rateProject);
router.post("/multipleuserdetails", getMultipleUserDetail);
router.post("/:id/reviews", getReviews);
export default router;

// checkForRole('any','free')
// checkForRole() //Same as checkForRole('any','required')
// checkForRole('co     mpany')
// checkForRole('professional')
// checkForRole('admin')
