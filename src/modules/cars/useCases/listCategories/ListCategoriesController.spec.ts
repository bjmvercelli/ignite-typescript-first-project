import request from "supertest";
import { hash } from "bcrypt";
import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";
import { DataSource } from "typeorm";
import { v4 as uuid } from "uuid";

let connection: DataSource;

describe("List Categories Controller", () => {  

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

  it("Should be able to list all categories", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({
        email: "admin@rentx.com",
        password: "admin"
      });

    const { token } = responseToken.body;
    
    await request(app)
      .post("/categories")
      .send({
        name: "Test category 2",
        description: "test"
      })
      .set({
        Authorization: `Bearer ${token}`
      });
        
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toBe("Test category 2");

  });
});