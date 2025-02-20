/**
 * @swagger
 * components:
 *   schemas:
 *     SociosDE:
 *       type: object
 *       properties:
 *         documento:
 *           type: integer
 *           description: Documento del socio
 *         idAbono:
 *           type: integer
 *           description: ID del abono
 *         vencimientoAbono:
 *           type: string
 *           format: date-time
 *           description: Fecha de vencimiento del abono
 *         contadorAbono:
 *           type: integer
 *           description: Contador de abono
 *         sector:
 *           type: string
 *           description: Sector del socio
 *         seccion:
 *           type: string
 *           description: Sección del socio
 *         categoria:
 *           type: string
 *           description: Categoría del socio
 *         precioCategoria:
 *           type: number
 *           description: Precio de la categoría
 *         tipoSocio:
 *           type: string
 *           description: Tipo de socio
 *         idTipoSocio:
 *           type: integer
 *           description: ID del tipo de socio
 *         cobrador:
 *           type: string
 *           description: Cobrador del socio
 *         nombre:
 *           type: string
 *           description: Nombre del socio
 *         tipoDocumento:
 *           type: string
 *           description: Tipo de documento del socio
 *         calle:
 *           type: string
 *           description: Calle del socio
 *         numero:
 *           type: string
 *           description: Número de calle del socio
 *         localidad:
 *           type: string
 *           description: Localidad del socio
 *         codigoPostal:
 *           type: string
 *           description: Código postal del socio
 *         telefono:
 *           type: string
 *           description: Teléfono del socio
 *         tarjeta:
 *           type: string
 *           description: Tarjeta del socio
 *         contadorSocio:
 *           type: integer
 *           description: Contador del socio
 *         numSocio:
 *           type: integer
 *           description: Número de socio
 *         nacimiento:
 *           type: string
 *           format: date-time
 *           description: Fecha de nacimiento del socio
 *         ingreso:
 *           type: string
 *           format: date-time
 *           description: Fecha de ingreso del socio
 *         ultimoPago:
 *           type: string
 *           format: date-time
 *           description: Fecha del último pago del socio
 *         ultimaModificacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de última modificación del socio
 *         estado:
 *           type: string
 *           description: Estado del socio
 *         formaDePago:
 *           type: string
 *           description: Forma de pago del socio
 *         filial:
 *           type: string
 *           description: Filial del socio
 *         idSexo:
 *           type: string
 *           description: ID del sexo del socio
 *         sexo:
 *           type: string
 *           description: Sexo del socio
 *         provincia:
 *           type: string
 *           description: Provincia del socio
 *         nacionalidad:
 *           type: string
 *           description: Nacionalidad del socio
 *         celular:
 *           type: string
 *           description: Celular del socio
 *         mail:
 *           type: string
 *           description: Correo electrónico del socio
 *         huellas:
 *           type: boolean
 *           description: Indicador de huellas del socio
 *         procedencia:
 *           type: string
 *           description: Procedencia del socio
 *         idEstado:
 *           type: integer
 *           description: ID del estado del socio

 */
export class SociosDE {
    documento!: number;
    idAbono?: number;
    vencimientoAbono?: Date;
    contadorAbono?: number;
    sector?: string;
    seccion?: string;
    categoria!: string;
    precioCategoria?: number;
    tipoSocio?: string;
    idTipoSocio?: number;
    cobrador?: string;
    nombre?: string;
    tipoDocumento?: string;
    calle?: string;
    numero?: string;
    localidad?: string;
    codigoPostal?: string;
    telefono?: string;
    tarjeta?: string;
    contadorSocio?: number;
    numSocio?: number;
    nacimiento?: Date;
    ingreso?: Date;
    ultimoPago?: Date;
    ultimaModificacion?: Date;
    estado?: string;
    formaDePago?: string;
    filial?: string;
    idSexo?: string;
    sexo?: string;
    provincia?: string;
    nacionalidad?: string;
    celular?: string;
    mail?: string;
    huellas?: boolean;
    procedencia?: string;
    idEstado?: number;
}