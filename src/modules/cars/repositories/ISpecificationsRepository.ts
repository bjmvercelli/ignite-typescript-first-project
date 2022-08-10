import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ISpecificationsDTO {
  name: string,
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationsDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ISpecificationsDTO }