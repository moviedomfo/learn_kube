import { createContainer, asClass, InjectionMode } from "awilix";
import SociosService from "@app/Socios.service";
import SociosController from "@infra/controllers/socios.controller";
import SociosRepository from "@infra/repos/SociosSQL.repo";
import AuthController from "@infra/controllers/auth.controller";
import AuthService from "@app/Auth.service";
import RefreshTokenService from "@app/RefreshToken.service";
import UserMockRepository from "@infra/repos/UserMock.repo";
import InMemCahceRepository from "@infra/repos/InMemCahceRepository.repo";
import ReportsController from "@infra/controllers/reports.controller";
import ReportsService from "@app/Reports.service";

import ReportsRepository from "@infra/repos/Reports.repo";
import ApiLogsRepository from "@infra/repos/ApiLogs.repo";



/**
 * Dependency Injection (DI) Container implemented with awilix 
 */
const Container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});


Container.register({

  authService: asClass(AuthService).scoped(),
  refreshTokenService: asClass(RefreshTokenService).scoped(),
  sociosRepo: asClass(SociosRepository).scoped(),
  sociosService: asClass(SociosService).scoped(),
  sociosController: asClass(SociosController).scoped(),
  authController: asClass(AuthController).scoped(),
  userRepository: asClass(UserMockRepository).scoped(),
  cacheRepository: asClass(InMemCahceRepository).scoped(),

  reportsController: asClass(ReportsController).scoped(),
  reportsService: asClass(ReportsService).scoped(),
  reportsRepo: asClass(ReportsRepository).scoped(),

  apiLogsRepo: asClass(ApiLogsRepository).scoped(),

});

export const sociosService = Container.resolve("sociosService");
export const sociosController = Container.resolve("sociosController");
export const sociosRepo = Container.resolve("sociosRepo");
export const userRepository = Container.resolve("userRepository");

export const authService = Container.resolve("authService");
export const refreshTokenService = Container.resolve("refreshTokenService");
export const authController = Container.resolve("authController");


export const reportsController = Container.resolve("reportsController");
export const reportsService = Container.resolve("reportsService");
export const reportsRepo = Container.resolve("reportsRepo");
export const apiLogsRepo = Container.resolve("apiLogsRepo");


export default Container;
