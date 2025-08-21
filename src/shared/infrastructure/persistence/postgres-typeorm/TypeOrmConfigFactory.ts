import type TypeOrmConfig from "./TypeOrmConfig.js";

export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
      host: process.env.POSTGRES_HOST as string,
      port: process.env.POSTGRES_PORT as unknown as number,
      username: process.env.POSTGRES_USER as string,
      password: process.env.POSTGRES_PASSWORD as string,
      database: process.env.POSTGRES_DB as string
    };
  }
}