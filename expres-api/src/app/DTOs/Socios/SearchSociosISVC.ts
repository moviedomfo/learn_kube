import { OffsetBaseDTO } from "@common/CleanBases/OffsetBaseDTO";
import { SociosDE } from "@domain/Entities/SociosDE";


/**
 * @swagger
 * components:
 *   schemas:
 *     SearchSociosRes:
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
 *             $ref: '#/components/schemas/SociosDE'
 */
export class SearchSociosRes extends OffsetBaseDTO {

  public socios: SociosDE[];

}

