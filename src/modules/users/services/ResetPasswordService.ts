import { compare, hash } from "bcrypt";
import AppError from "@shared/errors/AppError";
import { UserTokensRepositories } from "../database/repositories/UserTokensRepositories";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { isAfter, addHours } from "date-fns";

interface IResetPassword {
  password: string;
  token: string;
}

export default class ResetPasswordService {
  async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await UserTokensRepositories.findByToken(token);

    if (!userToken) {
      throw new AppError("User token does not exists.", 404);
    }

    const user = await usersRepositories.findById(userToken.id);

    if (!user) {
      throw new AppError("User does not exists.", 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired.", 401);
    }

    user.password = await hash(password, 10);

    await usersRepositories.save(user);
  }
}
