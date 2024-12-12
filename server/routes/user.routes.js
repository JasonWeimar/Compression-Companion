import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const UserRouter = Router()

UserRouter.route("/register")
    .post(UserController.register)

UserRouter.route("/logout")
    .post(UserController.logout)

UserRouter.route("/login")
    .post(UserController.login)

UserRouter.route("/user/:id/edit")
    .get(UserController.getOneUser)
    .patch(UserController.editUser)

export default UserRouter;