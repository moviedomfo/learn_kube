import { OffsetBaseDTO } from "@common/CleanBases/OffsetBaseDTO";


/**
 * @swagger
 * components:
 *   schemas:
 *     SearchSimpleViewSociosRes:
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
 *             $ref: '#/components/schemas/SocioSimpleViewDTO'
 */
export class SearchSimpleViewSociosRes extends OffsetBaseDTO {


  public socios: SocioSimpleViewDTO[];
}

/**
 * @swagger
 * components:
 *   schemas:
 *     SocioSimpleViewDTO:
 *       type: object
 *       properties:
 *         numSocio:
 *           type: integer
 *           description: Número de socio
 *         documento:
 *           type: integer
 *           description: Documento del socio
 *         ultimaModificacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de última modificación
 *         ultimaModificacion_epoch:
 *           type: integer
 *           description: Epoch de la última modificación
 *         ultimaModificacion_tz:
 *           type: string
 *           description: Zona horaria de la última modificación
 */
export class SocioSimpleViewDTO {
  numSocio?: number;

  documento!: number;
  ultimaModificacion: Date;
  ultimaModificacion_epoch: number;
  ultimaModificacion_tz: string;
}