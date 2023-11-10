import express from "express"
import {createProject, inviteProfessional,viewApprovedProfessionals,getProjects, getProjectById, getMyCompanyProjects, updateProjectStatus, requestJoinProject, manageProfessionalRequest, editProjectDetails, deleteProject, getCompanyProjects, getReviews} from "@controller/projectController"
import { checkForRole } from "@utils/authUtils";
const router = express.Router();

//To add a route add something like router.post("urlpath",function)
// router.post("/create",checkForRole("company"),createProject);
router.post("/create",checkForRole("company"),createProject);
router.post("/getProjects",getProjects);
router.get("/getMyCompanyProject",checkForRole("company"),getMyCompanyProjects);
router.get("/:ownerID/getCompanyProject",getCompanyProjects);
router.get("/:id", getProjectById);
router.put("/:id/updateStatus",checkForRole("company"),updateProjectStatus);
router.put("/:id/join", checkForRole("professional"), requestJoinProject);
router.put("/:id/:action/:userId", checkForRole("company"), manageProfessionalRequest);
router.get("/:id/approvedProfessionals", checkForRole("company"), viewApprovedProfessionals);
router.post('/inviteProfessional', checkForRole('company'), inviteProfessional);
router.put("/:id/edit", checkForRole("company"), editProjectDetails);
router.delete("/:id/delete", checkForRole("company"), deleteProject);
router.post("/:id/reviews", getReviews);
export default router;
