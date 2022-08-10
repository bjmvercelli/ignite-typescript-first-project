import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "12341234",
      email: "teste@teste.com",
      password: "123",
      name: "Test user"
    };

    await createUserUseCase.execute({ ...user });

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token"); 
  });

  it("Should NOT be able to authenticate a nonexistent user", () => {
    expect(async () => {

      await authenticateUserUseCase.execute({
        email: "Usuarioinexistente@test.com",
        password: "123"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should NOT be able to authenticate with incorrent password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "1234",
        email: "test@test.com",
        password: "123",
        name: "Test User"
      };

      await createUserUseCase.execute({ ...user });

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

});