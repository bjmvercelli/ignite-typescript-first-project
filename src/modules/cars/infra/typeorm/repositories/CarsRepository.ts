import { Repository } from "typeorm";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import dataSource from "@shared/infra/typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  
  private repository: Repository<Car>

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }
  
  async create({ 
    name, 
    description, 
    daily_rate, 
    license_plate, 
    fine_amount, 
    brand, 
    category_id, 
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        license_plate
      }
    });

    return car;
  }

  async list(): Promise<Car[]> {
    const cars = await this.repository.find();
  
    return cars;
  }

  async findAvailable(name?: string, brand?: string, category_id?: string): Promise<Car[]> {
    const carsQuery = await this.repository
    .createQueryBuilder("c")
    .where("available = :available", { available: true })

    if (name)
      carsQuery.andWhere("name = :name", { name })

    if (brand)
      carsQuery.andWhere("brand = :brand", { brand })
    
    if (category_id)
      carsQuery.andWhere("category_id = :category_id", { category_id })

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        id
      }
    });

    return car;
  }
}

export { CarsRepository }