import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { verify as jwtVerify } from "jsonwebtoken";

interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export default class AuthMiddleware {
  static execute(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT Token is missing.", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
      const decodedToken = verify(token, process.env.APP_SECRET as Secret);

      const { sub } = decodedToken as ITokenPayload;

      request.user = { id: sub };

      return next();
    } catch (error) {
      throw new AppError("Invalid JWT Token.", 401);
    }
  }
}
function verify(token: string | undefined, secret: Secret) {
  if (!token) {
    throw new Error("Token is required");
  }
  return jwtVerify(token, secret);
}
