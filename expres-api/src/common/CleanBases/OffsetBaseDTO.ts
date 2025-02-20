

/**
 * @swagger
 * components:
 *   schemas:
 *     OffsetBaseDTO:
 *       type: object
 *       properties:
 *         total_count:
 *           type: integer
 *           description: Número total de resultados
 *         count:
 *           type: integer
 *           description: Número de resultados en esta página
 */
export class OffsetBaseDTO {


  public total_count: number;

  public count: number;
}
