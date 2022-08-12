import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {

  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const { admin } = await usersRepository.findById(id);

  if (!admin) throw new AppError("User is not an admin!");

  return next();
}