import AppError from "@shared/errors/AppError";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { User } from "../database/entities/User";
import { hash } from "bcrypt";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  async execute({ name, email, password }: ICreateUser): Promise<User> {
    const emailExists = await usersRepositories.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email address already used.", 409);
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRepositories.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
