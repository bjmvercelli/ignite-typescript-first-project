import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "9b4465529673b2961bf948a87b0a3194") as IPayload;
    
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User does not exists!", 401);

    request.user = {
      id: user_id
    }

    return next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}