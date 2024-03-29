import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {

  categories: Category[] = [];


  async findByName(nome: string): Promise<Category> {
    const category = this.categories.find(category => category.name === nome);

    return category;
  }

  async list(): Promise<Category[]> {
    const all = this.categories;

    return all;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name, description
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory }