import express from "express"
import user from "@routes/user";
import project from "@routes/project";
import admin from "@routes/admin";
const router = express.Router();

router.use("/user",user);
router.use("/project",project);
router.use("/admin",admin);
export default router
