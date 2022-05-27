import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";



class PostgresCategoryRepository implements ICategoriesRepository {
  findByName(nome: string): Category {
    return null;
  }
  list(): Category[] {
    return null;
  }
  create({ name, description }: ICreateCategoryDTO): void {
    console.log('oi')
  }
}

export { PostgresCategoryRepository }