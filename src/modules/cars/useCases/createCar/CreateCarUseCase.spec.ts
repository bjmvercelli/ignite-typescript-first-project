import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Test Car",
      description: "Test Car description",
      daily_rate: 10,
      license_plate: "ABC123",
      fine_amount: 100,
      brand: "Mercedes",
      category_id: "category"
    });

    expect(car).toHaveProperty("id");
  });

  it("Should NOT be able to create a car with existent license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Test Car",
        description: "Test Car description",
        daily_rate: 10,
        license_plate: "ABC123",
        fine_amount: 100,
        brand: "Mercedes",
        category_id: "category"
      });

      await createCarUseCase.execute({
        name: "Test Car 2",
        description: "Test Car description 2",
        daily_rate: 10,
        license_plate: "ABC123",
        fine_amount: 100,
        brand: "Mercedes",
        category_id: "category"
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it("Should be able to create a car with 'available' true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Test Car",
      description: "Test Car description",
      daily_rate: 10,
      license_plate: "ABCD123",
      fine_amount: 100,
      brand: "Mercedes",
      category_id: "category"
    });

    expect(car.available).toBe(true);
  });

});