import express from "express"
const router = express.Router();
import {getStatistics, deleteUser} from "@controller/adminController"
import { checkForRole } from "@utils/authUtils";
import { uploadMiddleware } from "@utils/fileUploadUtils";

router.post("/statistics",checkForRole('admin'),getStatistics);
router.delete("/deleteuser/:id",checkForRole('admin'),deleteUser);
export default router;