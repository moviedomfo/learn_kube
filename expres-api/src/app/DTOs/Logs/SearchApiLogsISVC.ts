import { OffsetBaseDTO } from "@common/CleanBases/OffsetBaseDTO";
import { ApiLogsDTO } from "./ApiLogsDTO";


/**
 * @swagger
 * components:
 *   schemas:
 *     SearchApiLogsRes:
 *       type: object
 *       properties:
 *         total_count:
 *           type: integer
 *           description: Número total de resultados
 *         count:
 *           type: integer
 *           description: Número de resultados en esta página
 *         socios:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReportDTO'
 */
export class SearchApiLogsRes extends OffsetBaseDTO {

  public logs: ApiLogsDTO[];

}

