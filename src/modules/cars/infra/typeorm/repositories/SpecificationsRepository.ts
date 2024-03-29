import { In, Repository } from "typeorm";
import dataSource from "@shared/infra/typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor(){
    this.repository = dataSource.getRepository(Specification);
  }

  async create({ name, description }: ISpecificationsDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description
    })
  
    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findBy({
      id: In(ids)
    });

    return specifications;
  }
}

export { SpecificationsRepository }