import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {

  const dayAdd24Hours = dayjs().add(1, 'd').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider);
  });

  it("Should be able to create a new rental", async () => {

    const rental = await createRentalUseCase.execute({
      user_id: "1111",
      car_id: "2222",
      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should NOT be able to create a new rental due to user unavailable", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1111",
        car_id: "2222",
        expected_return_date: dayAdd24Hours
      });
  
      await createRentalUseCase.execute({
        user_id: "1111",
        car_id: "22223",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should NOT be able to create a new rental due to car unavailable", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "11112",
        car_id: "2222",
        expected_return_date: dayAdd24Hours
      });
  
      await createRentalUseCase.execute({
        user_id: "1111",
        car_id: "2222",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should NOT be able to create a new rental due to invalid return time", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "11112",
        car_id: "2222",
        expected_return_date: new Date()
      });
  
    }).rejects.toBeInstanceOf(AppError);
  });
});