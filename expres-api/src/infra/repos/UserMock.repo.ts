
import { IUserRepository } from "@app/interfases/IUserRepository";
import { MokUsers, User } from "@domain/Entities/User";
import { compare, hash, hashSync } from "bcryptjs";
const mockData = require("../../../mock/usermok.json");

/**
 * Persist users to file  
 * */
export default class UserMockRepository implements IUserRepository {
  private static MokUsers: MokUsers;

  private static async LoadUsers() {
    if (!UserMockRepository.MokUsers) UserMockRepository.MokUsers = mockData as MokUsers;
  }

  public async GetUserById(userId: string): Promise<User> {
    await UserMockRepository.LoadUsers();

    const user = UserMockRepository.MokUsers.Users.find((p) => p.id === userId);
    return user;
  }

  public async FindByUserName(userName: string): Promise<User> {
    await UserMockRepository.LoadUsers();

    const user = UserMockRepository.MokUsers.Users.find((p) => p.userName === userName);

    return user;
  }

  /**
   *
   * @param password
   * @returns Hassed Passwword
   */
  public HassPassword(password: string): Promise<string> {
    //  Salt length to generate or salt to use, default to 10
    const saltWorkFactor = 12;
    return hash(password, saltWorkFactor);
  }

  /**
   *
   * @param password
   * @param hash
   * @returns
   */
  public async VerifyPassword(password: string, hash: string): Promise<boolean> {

    return compare(password, hash);
  }
}
