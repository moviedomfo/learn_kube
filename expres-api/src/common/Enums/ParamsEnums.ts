// Enum definitions based on provided data

export enum MedioContacto {
    TelFijo = 11,
    Cel = 12,
    Email = 13,
    LinkedIn = 14,
    MailInst = 15
}

export enum TipoSociosa {
    Interna = 101,
    Externa = 102,
    Extranjero = 103
}

export enum Genero {
    Masculino = 151,
    Femenino = 152
}

export enum EstadoCivil {
    Soltero = 161,
    Casado = 162,
    Divorsiado = 163,
    Viudo = 164
}

export enum DocType {
    DNI = 171,
    CI = 172
}

export enum Locations {
    Pais = 1001,
    Provincia = 1002,
    Comuna = 1003,
    Ciudad = 1004,
    Barrio = 1005
}

export enum Modalidad {
    Virtual = 1101,
    Presencial = 1102,
    Semipresencial = 1103,
    Sincronico = 1151,
    SincronicoTutorado = 1152
}

export enum TipoEvento {
    Webinarios = 1171,
    CursoElearning = 1172,
    Conversatorio = 1173,
    Videoconferencia = 1174
}

export enum TipoInstancia {
    Publicada = 1191,
    Borrador = 1192,
    Cancelada = 1193,
    Cerrada = 1194
}

export enum TipoPlataforma {
    Moodle = 1201,
    Otra = 1202

}
// Class to encapsulate all enums
export class ParamsEnum {
    static MedioContacto = MedioContacto;
    static TipoSociosa = TipoSociosa;
    static Genero = Genero;
    static EstadoCivil = EstadoCivil;
    static DocType = DocType;
    static Locations = Locations;
    static Modalidad = Modalidad;
    static TipoEvento = TipoEvento;
    static TipoInstancia = TipoInstancia;
    static TipoPlataforma = TipoPlataforma;
}