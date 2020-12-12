import { Router } from "express";
import UserController from "../controllers/user.controller";
import { SignIn } from "../controllers/auth.controller";
import { VerifyToken } from "../middlewares/authjwt";
const router = new (Router as any)();

const userController = new UserController();

// Get all Events
router.get("/getusers", [VerifyToken, userController.GetAllUsers]);

// Get one user by id
router.get("/getuser/:id", [VerifyToken, userController.GetUserById]);

// Update one user
router.post("/updateuser", [VerifyToken, userController.UpdateUser]);

// Delete one user by id
router.delete("/deleteuser/:id", [VerifyToken, userController.DeleteUserById]);

// is logged in?
router.get("/isloggedin", [VerifyToken, userController.IsLoggedIn]);

// Register a new user
router.route("/createuser").post(userController.CreateUser);
// Get token for user
router.route("/singin").post(SignIn);

export default router;
