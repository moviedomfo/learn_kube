// import { hash  } from "bcryptjs";
import { randomBytes, createHmac } from 'crypto';

export class CryptoFunctions {

  /**
   * 
   * @param value 
   * @param key 
   * @returns 
   */
  public static Hash(value: string, secretKey: string): string {


    const hmac = createHmac('sha256', secretKey);
    hmac.update(value);
    return hmac.digest('hex');

    //  Salt length to generate or salt to use, default to 10
    // const saltWorkFactor = 12;
    // return hash(value, saltWorkFactor);
  }
  /**
   * 
   * @returns 
   */
  public static GenerateSecureKey(): string {

    const keyLength = 32;
    return randomBytes(keyLength).toString('hex');



  }
}
