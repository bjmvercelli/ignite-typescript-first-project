import { ICreateCarDTO } from "../dtos/ICreateCarDTO"
import { Car } from "../infra/typeorm/entities/Car"


interface ICarsRepository {
  create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, id, specifications }: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable( name?: string, brand?: string, category_id?: string ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  list(): Promise<Car[]>
}

export { ICarsRepository }