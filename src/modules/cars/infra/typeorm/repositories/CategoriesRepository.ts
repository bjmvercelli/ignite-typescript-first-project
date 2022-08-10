import { Repository } from "typeorm";
import dataSource from "@shared/infra/typeorm";

import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from "@modules/cars/infra/typeorm/entities/Category"

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO ): Promise<void> { // a rota não necessita ter acesso ao model, por isso utilizamos um DTO
    const category = this.repository.create({ 
      name,
      description
    })

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({
      name
    });

    return category;
  }
}

export { CategoriesRepository }