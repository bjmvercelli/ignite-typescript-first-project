import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { createConnection } from "./database";
import { router } from "./routes";

import "./shared/container"

createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.listen(3333);