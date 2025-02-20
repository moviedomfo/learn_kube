import { AuthenticationReq, AuthenticationRes } from "@app/DTOs/Auth/AuthorizationDto";
import { GetUserReq, GetUserRes } from "@app/DTOs/Auth/GetUserDto";
import { HashDTO } from "@app/DTOs/Auth/HashDTO";
import { RefreshTokenReq, RefreshTokenRes } from "@app/DTOs/Auth/RefreshTokenDto";



export interface IAuthService {
  /** */
  RefreshToken: (req: RefreshTokenReq) => Promise<RefreshTokenRes>;
  /** */
  Auth: (req: AuthenticationReq) => Promise<AuthenticationRes>;
  GetUser: (req: GetUserReq) => Promise<GetUserRes>;
  Hash: (value:string) => Promise<HashDTO>;
}
