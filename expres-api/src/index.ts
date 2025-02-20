import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { notFoundHandler } from "@common/not-found.middleware";
import { ExpressErrorHandler } from "./common/ErrorHandle/ExpressErrorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import { reportsRouter } from "@infra/router/reports.router";
import { sociosRouter } from "@infra/router/socios.router";
import { AppConstants } from "@common/CommonConstants";
import "dotenv/config";
import { authRouter } from "@infra/router/auth.router";
import { logsMiddle } from "@common/log.middlewar";

const packageJson = require("./../package.json");

require("dotenv").config();

if (!AppConstants.APP_PORT) {
  process.exit(1);
}

const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("short"));
//app.use(morgan('combined'));
//app.use(morgan('tiny'));
// itemsRouter.use(morgan('dev'));

/**set middleware to serve static files */
app.use(express.static(__dirname + "/public"));

app.get("/health", (_req, res) => {
  const response = {
    version: packageJson.version,
    appName: AppConstants.APP_CLIENT_NAME,
  };
  res.send(response);
});

app.get("/", function (_req, res) {
  res.json({ message: "Bienvenido a la API" });
});
// Swagger documentation route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/security/", authRouter);
app.use("/api/socios/", logsMiddle, sociosRouter);
// app.use("/api/socios/", logsMiddle);
app.use("/api/reports/", reportsRouter);

// Attach the first Error handling Middleware
app.use(notFoundHandler);
app.use(ExpressErrorHandler);

const URL = `${process.env.APP_BASE_URL}:${AppConstants.APP_PORT}`;

/**
 * Server Activation
 */
app.listen(AppConstants.APP_PORT, () => {
  console.log(`-------------------------------------------------------------------------------`);
  console.log(` ${AppConstants.APP_CLIENT_NAME} V${packageJson.version}  listening on port ${AppConstants.APP_PORT}`);
  console.log(` API url ${URL}`);
  console.log(` API doccumentation ${URL}/docs/`);
  console.log(`-------------------------------------------------------------------------------`);
});
