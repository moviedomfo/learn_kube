
/**
 * @swagger
 * components:
 *   schemas:
 *     ReportDTO:
 *       type: object
 *       properties:
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha generacion del log
 *           example: '2023-08-14T12:34:56Z'
 *         fechaModif:
 *           type: string
 *           format: date-time
 *           description: Fecha de modificación del socio
 *         action:
 *           type: string
 *           description: Acción realizada 
 *           example: 'create'
 *         numSocio:
 *           type: integer
 *           description: Número de socio 
  */
export class ReportDTO {
  fecha?: Date;
  fechaModif?: Date;
  action?: string;
  numSocio?: number;
}


