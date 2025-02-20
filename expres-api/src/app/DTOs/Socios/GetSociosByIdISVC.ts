import { SociosDE } from "@domain/Entities/SociosDE";

/**
 * @swagger
 * components:
 *   schemas:
 *     GetSocioByIdRes:
 *       type: object
 *       properties:
 *         socios:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SociosDE'
 */
export class GetSocioByIdRes {

  public socio: SociosDE;

}
