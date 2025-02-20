import { verify, sign, JwtPayload } from "jsonwebtoken";
import { Token } from "@domain/Entities/Token";
//import * as fs from "fs";
import { AppConstants } from "@common/CommonConstants";
import { User } from "@domain/Entities/User";

//const privateKey = config.get<string>("privateKey");
//const publicKey = config.get<string>("publicKey");
export class JWTFunctions {
  /**
   *
   * @param user
   * @param audienceId
   * @param _clientId
   * @returns
   */
  public static GenerateToken(user: User, audienceId: string, _clientId: string): string {
    // doesn´t works whitc this key loaded from config.

    //    console.log(__dirname);
    const payload = {
      _id: user.id,
      name: user.userName,
      //      role: user.roles
    };
    const audience = [audienceId];
    const expiresIn_minutes = AppConstants.JWT_Expires * 60;

    try {
      //let privateKey;
      // if (fs.existsSync("./../files")) privateKey = fs.readFileSync(`./../files/${clientId}_private_key.pem`, "utf-8");

      // if (fs.existsSync("./files")) privateKey = fs.readFileSync(`./files/${clientId}_private_key.pem`, "utf-8");
      //console.log(privateKey);

      // doesn´t works
      //const jwt2 = sign(payload, privateKey2, {expiresIn: expiresIn_minutes, audience, issuer: AppConstants.JWT_issuer.toString(), algorithm: "RS256"});

      //const jwt = sign(payload, privateKey, {expiresIn: expiresIn_minutes, audience, issuer: AppConstants.JWT_issuer.toString(), algorithm: "RS256"});

      // it's less safe than RSA
      const jwt = sign(payload, AppConstants.JWT_SECRET, { expiresIn: expiresIn_minutes, audience, issuer: AppConstants.JWT_issuer.toString() });
      return jwt;
    } catch (err) {
      throw err;
    }
  }
  /**
   *
   * @param token
   * @param _clientId
   * @returns
   */
  public static Verify(token: Token, _clientId: string = "rapikon"): JwtPayload {
    //if (clientId === "local") clientId = "pelsoftclient";

    //const publicKey = fs.readFileSync(`./files/${clientId}_public_key.pem`, "utf-8");
    // it's less safe than RSA
    const virification = verify(token.jwt, AppConstants.JWT_SECRET) as JwtPayload;
    //const virification = verify(token.jwt, publicKey) as JwtPayload;

    return virification;
  }
}
