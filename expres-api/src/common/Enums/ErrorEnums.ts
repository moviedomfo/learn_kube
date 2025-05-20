export enum ErrorTypeEnum {
  FunctionalException = "FunctionalException",
  TecnicalException = "TecnicalException",
  SecurityException = "SecurityException",
}

export enum ErrorCodeEnum {
  UNKNOWED = "1",
  PARAMETER_REQUIRED = "100",
  SEQUALIZE_TIMEOUT = "5000",
  SEQUALIZE_ELOGIN = "5001",
  /**SequelizeDatabaseError */
  SEQUALIZE_DATA = "5001",

  MONGO_TIMEOUT = "5200",
  REDIS = "5300",
  REDIS_NOAUTH = "5301",
}
