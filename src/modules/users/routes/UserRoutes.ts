import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { CreateUserSchema } from "../schemas/UserSchemas";

const userRouter = Router();
const usersControllers = new UsersControllers();

userRouter.get("/", usersControllers.index);
userRouter.post("/", CreateUserSchema, usersControllers.create);

export default userRouter;
