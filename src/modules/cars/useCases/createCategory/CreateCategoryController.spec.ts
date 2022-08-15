import request from "supertest";
import { hash } from "bcrypt";
import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";
import { DataSource } from "typeorm";
import { v4 as uuid } from "uuid";

let connection: DataSource;

describe("Create Category Controller", () => {  

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);
    
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license)
       VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', true, now(), '1234' )
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("Should be able to create a new category", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({
        email: "admin@rentx.com",
        password: "admin"
      });

    const { token } = responseToken.body;
    
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Test category",
        description: "test"
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(201);
  });

  it("Should NOT be able to create a duplicated category", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({
        email: "admin@rentx.com",
        password: "admin"
      });

    const { token } = responseToken.body;
    
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Test category",
        description: "test"
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(400);
  });
});