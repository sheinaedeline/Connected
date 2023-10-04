import express from "express"
import user from "@routes/user";
import project from "@routes/project";
const router = express.Router();

router.use("/user",user);
router.use("/project",project);

export default router
