import { Router } from "express";
import SetupController from "../controllers/setup.controller.js";



const SetupRouter = Router();

//Route listeners:
SetupRouter.route("/setup")
    .get(SetupController.getAllSetups)
    .post(SetupController.createNewSetup)

SetupRouter.route("/setup/:id/details")
    .get(SetupController.getOneSetup)
    .delete(SetupController.deleteSetupById)

SetupRouter.route("/setup/:id/edit")
    .get(SetupController.getOneSetup)
    .patch(SetupController.editSetup)


export default SetupRouter;
