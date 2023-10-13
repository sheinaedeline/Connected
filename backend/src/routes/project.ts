import express from "express"
import {createProject, inviteProfessional,viewApprovedProfessionals,getProjects, getProjectById, viewCompanyProjects, updateProjectStatus, requestJoinProject, manageProfessionalRequest} from "@controller/projectController"
import { checkForRole } from "@utils/authUtils";
const router = express.Router();

//To add a route add something like router.post("urlpath",function)
// router.post("/create",checkForRole("company"),createProject);
router.post("/create",checkForRole("company"),createProject);
router.get("/allProjects",getProjects);
router.get("/getAllCompanyProject",checkForRole("company"),viewCompanyProjects);
router.get("/:id", getProjectById);
router.put("/:id/updateStatus",checkForRole("company"),updateProjectStatus);
router.put("/:id/join", checkForRole("professional"), requestJoinProject);
router.put("/:id/:action/:userId", checkForRole("company"), manageProfessionalRequest);
router.get("/:id/approvedProfessionals", checkForRole("company"), viewApprovedProfessionals);
router.post('/inviteProfessional', checkForRole('company'), inviteProfessional);
export default router;
