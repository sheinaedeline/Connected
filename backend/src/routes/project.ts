import express from "express"
import {createProject, getProjects, getProjectById} from "@controller/projectController"
import { checkForRole } from "@utils/authUtils";
const router = express.Router();

//To add a route add something like router.post("urlpath",function)
// router.post("/create",checkForRole("company"),createProject);
router.post("/create",checkForRole("company"),createProject);
router.get("/allProjects",getProjects);
router.get("/:id", getProjectById);
export default router;
