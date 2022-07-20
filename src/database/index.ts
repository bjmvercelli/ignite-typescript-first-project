import { DataSource } from 'typeorm'
import { Category } from '../modules/cars/entities/Category';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentx',
  entities: [Category],
  migrations: [
    "./src/database/migrations/*.ts"
  ]
});

export function createConnection(host = "database_ignite"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource