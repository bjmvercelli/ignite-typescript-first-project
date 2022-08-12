import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";



let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  })

  it("Should list all available cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Test",
      brand: "Mercedes",
      category_id: "111",
      daily_rate: 100,
      fine_amount: 200,
      license_plate: "AAA333"
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });


  it("Should list all available cars by brand", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Test22",
      description: "Test",
      brand: "brand",
      category_id: "111",
      daily_rate: 100,
      fine_amount: 200,
      license_plate: "AAA333"
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "brand",
    });

    expect(cars).toEqual([car]);
  });

  it("Should list all available cars by name", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "TestCar",
      description: "Test",
      brand: "branddd",
      category_id: "111",
      daily_rate: 100,
      fine_amount: 200,
      license_plate: "AAA333"
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "TestCar",
    });

    expect(cars).toEqual([car]);
  });

  it("Should list all available cars by category", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "TestCar",
      description: "Test",
      brand: "branddd",
      category_id: "222",
      daily_rate: 100,
      fine_amount: 200,
      license_plate: "AAA333"
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "222",
    });

    expect(cars).toEqual([car]);
  });

});