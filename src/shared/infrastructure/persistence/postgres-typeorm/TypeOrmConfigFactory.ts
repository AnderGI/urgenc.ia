import type TypeOrmConfig from "./TypeOrmConfig.js";

export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'user',
      database: 'backoffice-backend'
    };
  }
}