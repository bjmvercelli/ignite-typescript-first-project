import { v4 as uuid } from "uuid";
import { hash } from "bcrypt"
import { createConnection } from "@shared/infra/typeorm/index";

async function create() {
  const connection = await createConnection("localhost");
  
  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license)
     VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', true, now(), '1234' )
    `
  );

  await connection.destroy();
}

create().then(() => console.log("Seed created"));
