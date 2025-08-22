import  { DataSource } from 'typeorm';
import type TypeOrmConfig  from './TypeOrmConfig.js';
import { fileURLToPath } from 'url';
import {dirname} from 'path';
import DomainEventFailoverClassEntity from '../../../domain/event/DomainEventFailoverClassEntity.js';

const moduleUrl = import.meta.url;
const fileUrl = fileURLToPath(moduleUrl)
const __dirname = dirname(fileUrl)

export class TypeOrmClientFactory {
  static async createClient(contextName: string, config: TypeOrmConfig): Promise<DataSource> { 
      const connection = new DataSource({
        name: contextName,
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [__dirname + '/../../../../contexts/**/infrastructure/persistence/postgres-typeorm/*{.js,.ts}', DomainEventFailoverClassEntity],
        synchronize: false,
        logging: true
      });
      return connection.initialize();
  }
}