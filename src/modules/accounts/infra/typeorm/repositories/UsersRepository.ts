import { Repository } from "typeorm";
import dataSource from "@shared/infra/typeorm";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

class UsersRepository implements IUsersRepository{
  private repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create({ id, name, password, email, driver_license, avatar }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      password,
      email,
      driver_license,
      avatar
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ 
      where: {
        email 
      } 
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.repository.findOne({
      where: {
        id 
      }
    });

    return user;
  }
}

export { UsersRepository }