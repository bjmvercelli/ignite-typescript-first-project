import { DataSource } from 'typeorm'

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentx',
  entities: [ Category, Specification, User, Car, CarImage, Rental ],
  migrations: [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ]
});

export function createConnection(host = "database_ignite"): Promise<DataSource> {
  return dataSource.setOptions({
    host: process.env.NODE_ENV === "test" ? "localhost" : host,
    database: process.env.NODE_ENV === "test" ? "rentx_test" : dataSource.options.database as string
  }).initialize();
}

export default dataSource