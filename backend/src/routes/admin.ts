import express from "express"
const router = express.Router();
import {getStatistics} from "@controller/adminController"
import { checkForRole } from "@utils/authUtils";
import { uploadMiddleware } from "@utils/fileUploadUtils";

router.post("/statistics",checkForRole('admin'),getStatistics);
export default router;