import AppError from "@shared/errors/AppError";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { UserTokensRepositories } from "../database/repositories/UserTokensRepositories";

interface IForgetPassword {
  email: string;
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgetPassword): Promise<void> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists.", 404);
    }

    const token = await UserTokensRepositories.generate(user.id);

    console.log(token);
  }
}
