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
  SEQUALIZE_UNIQUE_VIOLATION =  "5002",
  /**SequelizeDatabaseError */
  SEQUALIZE_DATA = "5003",
  KAFKA_TIMEOUT = "5100",
  KAFKA_TOPIC_NOT_EXIST = "5101",
  MONGO_TIMEOUT = "5200",
  REDIS = "5300",
  REDIS_NOAUTH = "5301",
}
