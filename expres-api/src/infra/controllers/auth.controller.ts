import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@common/Enums/HttpStatusCode";
import { AuthenticationReq } from "@app/DTOs/Auth/AuthorizationDto";
import { RefreshTokenReq } from "@app/DTOs/Auth/RefreshTokenDto";
import { IAuthService } from "@domain/interfases/IAuthService";

/**
 * 
 */
export default class AuthController {
  constructor(private readonly authService: IAuthService) { }

  public Auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: AuthenticationReq = req.body as AuthenticationReq;
      const response = await this.authService.Auth(reqBody);
      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };


  public RefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: RefreshTokenReq = req.body as RefreshTokenReq;

      const response = await this.authService.RefreshToken(reqBody);
      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };


  public Hash = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { value } = req.query;
      const response = await this.authService.Hash(value.toString());

      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };
}
