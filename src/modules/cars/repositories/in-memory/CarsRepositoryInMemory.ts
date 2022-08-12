import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {
  
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate, 
    fine_amount, 
    brand, 
    category_id 
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });
    
    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_plate === license_plate);

    return car;
  }

  async list(): Promise<Car[]> {
    return this.cars;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {

    const availableCars = this.cars
      .filter(car => {
          if (
            car.available ||
            (
              (brand && car.brand === brand) || 
              (category_id && car.category_id === category_id) || 
              (name && car.name === name)
            )
        ) {
          return car;
        }
        return null
      });
     
    return availableCars;
  }

}

export { CarsRepositoryInMemory }