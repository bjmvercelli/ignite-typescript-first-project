import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  
  it("Should be able to create a new category", async () => {
    const category = {
      name: "Name Test",
      description: "Category Test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
    
  });

  it("Should NOT be able to create a new category with existent name", async () => {
    
    expect(async () => {
      const category = {
        name: "Name Test",
        description: "Category Test"
      }
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
      
    }).rejects.toBeInstanceOf(AppError);

  });
});