import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc);

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {

  constructor(

    private rentalsRepository: IRentalsRepository
  ){}

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const minimalHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if(carUnavailable) throw new AppError("Rental in progress for this car");

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if(rentalOpenToUser) throw new AppError("Rental in progress for this user!");

    const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format();
    const dateNow = dayjs().utc().local().format();

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

    if(compare < minimalHours) throw new AppError("Invalid return time!");

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });

    return rental;
  }
}

export { CreateRentalUseCase }