import { ApiLogsDTO } from "@app/DTOs/Logs/ApiLogsDTO";
import { Request, Response, NextFunction } from "express";
import { ExeptionFunctions } from "./helpers/ExeptionFunctions";
import Container from "./ContainerOk";
import HttpStatusCode from "@common/Enums//HttpStatusCode";
import { IApiLogsRepository } from "@app/interfases/IApiLogsRepository";
const apiLogsRepository: IApiLogsRepository = Container.resolve("apiLogsRepo") as IApiLogsRepository;

// you must mount the errorHandler middleware function after you have mounted all the controller functions of your application.
export const logsMiddle = (request: Request, response: Response, next: NextFunction) => {
  const startTime = Date.now();
  const apiLog: ApiLogsDTO = new ApiLogsDTO();

  apiLog.fecha = new Date();
  apiLog.http_method = request.method;
  apiLog.endpoint = request.originalUrl;

  apiLog.user_agent = request.headers['user-agent'];
  apiLog.client_ip = request.headers['x-forwarded-for'] as string || request.socket.remoteAddress || '';
  apiLog.request_params = JSON.stringify(request.params);

  console.log("---------------------------------");
  response.on("finish", function () {

    apiLog.response_time_ms = Date.now() - startTime;
    apiLog.response_code = response.statusCode;

    console.log("--------------API Log-------------------");
    console.log("Fecha:           ", apiLog.fecha);
    console.log("Endpoint:        ", apiLog.endpoint);
    console.log("HTTP Method:     ", apiLog.http_method);
    console.log("Client IP:       ", apiLog.client_ip);
    console.log("User-Agent:      ", apiLog.user_agent);
    console.log("Response Code:   ", apiLog.response_code);
    console.log("Response Time:   ", apiLog.response_time_ms, "ms");
    console.log("Request Params:  ", apiLog.request_params);
    console.log("----------------------------------------");

    apiLogsRepository.Insert(apiLog).catch(err => {
      console.log('----------error on log------------------')
      console.log(err)
    });

  });
  next();
};
