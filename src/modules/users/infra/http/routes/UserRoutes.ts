import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { CreateUserSchema } from "../schemas/UserSchemas";
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const userRouter = Router();
const usersControllers = new UsersControllers();

userRouter.get("/", AuthMiddleware.execute, usersControllers.index);
userRouter.post("/", CreateUserSchema, usersControllers.create);

export default userRouter;
