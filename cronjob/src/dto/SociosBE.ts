export class SocioWrap {

  socio: SocioBE;
}

export class SocioBE {
  documento: number;
  ultimaModificacion_epoch:number;
  idAbono?: number;
  vencimientoAbono?: Date;
  contadorAbono?: number;
  sector?: string;
  seccion?: string;
  categoria: string;
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
  crc32Foto?: number;

  // constructor(data: any) {
  //   this.idAbono = data.idAbono;
  //   this.vencimientoAbono = data.vencimientoAbono ? new Date(data.vencimientoAbono) : null;
  //   this.contadorAbono = data.contadorAbono;
  //   this.sector = data.sector;
  //   this.seccion = data.seccion;
  //   this.categoria = data.categoria;
  //   this.precioCategoria = data.precioCategoria;
  //   this.tipoSocio = data.tipoSocio;
  //   this.idTipoSocio = data.idTipoSocio;
  //   this.cobrador = data.cobrador;
  //   this.nombre = data.nombre;
  //   this.tipoDocumento = data.tipoDocumento;
  //   this.documento = data.documento;
  //   this.calle = data.calle;
  //   this.numero = data.numero;
  //   this.localidad = data.localidad;
  //   this.codigoPostal = data.codigoPostal;
  //   this.telefono = data.telefono;
  //   this.tarjeta = data.tarjeta;
  //   this.contadorSocio = data.contadorSocio;
  //   this.numSocio = data.numSocio;
  //   this.nacimiento = new Date(data.nacimiento);
  //   this.ingreso = new Date(data.ingreso);
  //   this.ultimoPago = new Date(data.ultimoPago);
  //   this.ultimaModificacion = new Date(data.ultimaModificacion);
  //   this.estado = data.estado;
  //   this.formaDePago = data.formaDePago;
  //   this.filial = data.filial;
  //   this.idSexo = data.idSexo;
  //   this.sexo = data.sexo;
  //   this.provincia = data.provincia;
  //   this.nacionalidad = data.nacionalidad;
  //   this.celular = data.celular;
  //   this.mail = data.mail;
  //   this.huellas = data.huellas;
  //   this.procedencia = data.procedencia;
  //   this.idEstado = data.idEstado;
  //   this.crc32Foto = data.crc32Foto;
  // }
}

export class SocioList {
  list: SocioListItem[];
}

export class SocioListItem {
  numSocio: number;
  modif: string;
}
