import { Router } from "express";
import UserController from "../controllers/user.controller";
import { SignIn } from "../controllers/auth.controller";
const router = new (Router as any)();

const userController = new UserController();

// Get all Events
router.route("/getusers").get(userController.GetAllUsers);

// Get one user by id
router.route("/getuser/:id").get(userController.GetUserById);

// Add a new user
router.route("/createuser").post(userController.CreateUser);

// Update one user
router.route("/updateuser").post(userController.UpdateUser);

// Delete one user by id
router.route("/deleteuser/:id").delete(userController.DeleteUserById);

router.route("/singin").post(SignIn);

export default router;
