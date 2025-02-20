import { OffsetBaseDTO } from "@common/CleanBases/OffsetBaseDTO";
import { ReportDTO } from "./ReportBE";


/**
 * @swagger
 * components:
 *   schemas:
 *     SearchReportsRes:
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
export class SearchReportsRes extends OffsetBaseDTO {

  public reports: ReportDTO[];

}

