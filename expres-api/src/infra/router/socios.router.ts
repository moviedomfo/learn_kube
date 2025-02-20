
import Container from "@common/ContainerOk";
import checkTokenMeddeware from "@common/auth.middleware";
import SociosController from "@infra/controllers/socios.controller";
import express from "express";

export const sociosRouter = express.Router();

const sociosController: SociosController = Container.resolve("sociosController") as SociosController;
/**
 * @swagger
 * /api/socios/simpleView/:
 *   get:
 *     tags: [socios]
 *     summary: Realiza busqueda de socios y retorna una lista simple
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha de inicio para filtrar los resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Tamaño de la página
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Página actual
 *     responses:
 *       200:
 *         description: Lista de socios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchSimpleViewSociosRes'
 *       204:
 *         description: No hay socios encontrados
 *       400:
 *         description: Parámetros inválidos
 */
sociosRouter.get("/simpleView",checkTokenMeddeware, sociosController.SearchSimpleView);

/**
 * @swagger
 * /api/socios/:
 *   get:
 *     tags: [socios]
 *     summary: Obtiene socio por numSocio
 *     parameters:
 *       - in: query
 *         name: numSocio
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de socio
 *     responses:
 *       200:
 *         description: Socio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSocioByIdRes'
 *       204:
 *         description: No hay socios encontrados
 *       400:
 *         description: Parámetros inválidos
 */
sociosRouter.get("/:id",checkTokenMeddeware, sociosController.GetById);



/**
 * @swagger
 * /api/socios/exist:
 *   get:
 *     tags: [socios]
 *     summary: Verifica la existencia de un socio por nro Socio y fecha. Solo util para verificar correcto almacen de fechas
 *     parameters:
 *       - in: query
 *         name: numSocio
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de socio
 *       - in: query
 *         name: ultimaModifi
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Fecha de última modificación
 *     responses:
 *       200:
 *         description: Socio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocioSimpleViewDTO'
 *       204:
 *         description: No se encontró el socio
 *       400:
 *         description: Parámetros inválidos
 */
sociosRouter.get("/exist",checkTokenMeddeware, sociosController.Exist);

/**
 * @swagger
 * /api/socios:
 *   get:
 *     tags: [socios]
 *     summary: Obtiene una lista de socios
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha de inicio para filtrar los resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Tamaño de la página
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Página actual
 *     responses:
 *       200:
 *         description: Lista de socios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchSociosRes'
 *       204:
 *         description: No se encontraron socios
 *       400:
 *         description: Parámetros inválidos
 */
sociosRouter.get("", sociosController.GetAll);



