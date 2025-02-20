
//import container from "@common/DependencyInj/Container";
import express from "express";
import Container from "@common/ContainerOk";
import ReportsController from "@infra/controllers/reports.controller";
import checkTokenMeddeware from "@common/auth.middleware";
export const reportsRouter = express.Router();
const reportsController: ReportsController = Container.resolve("reportsController") as ReportsController;

/**
 * @swagger
 * /api/reports/searchCsv/:
 *   get:
 *     tags: [reports]
 *     summary: Permite descarga por streeming de reportes en formato csv .-
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha de inicio para filtrar los resultados
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Opcional Fecha de fin para filtrar los resultados. Si es vacia -> ''  se utiliza startDate  como si fuece consulata por un solo dia.-
 *     responses:
 *       200:
 *         description: archivo .zip con los reportes encontrados por dia  entre las fechas
 *       204:
 *         description: No hay socios encontrados
 *       400:
 *         description: Parámetros inválidos
 */
reportsRouter.get("/searchCsv", checkTokenMeddeware, reportsController.SearchCsv);

/**
 * @swagger
 * /api/reports//:
 *   get:
 *     tags: [reports]
 *     summary: Busca  reporte de transacciones de socios en formato json .-
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha de inicio para filtrar los resultados
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Opcional Fecha de fin para filtrar los resultados. Si es vacia -> ''  se utiliza startDate  como si fuece consulata por un solo dia.-
 *     responses:
 *       200:
 *         description: archivo .zip con los reportes encontrados por dia  entre las fechas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchReportsRes'
 *       204:
 *         description: No hay socios encontrados
 *       400:
 *         description: Parámetros inválidos
 */
reportsRouter.get("/", checkTokenMeddeware, reportsController.Search);


reportsRouter.get("/usagelogs", checkTokenMeddeware, reportsController.SearchUsage_logs);
