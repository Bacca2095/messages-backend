import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { EnvConstants } from './src/config/environment/env-constants.enum';
import { EnvVariables } from './src/config/environment/env-variables.enum';

config({ path: './env/development.env' });

const configService = new ConfigService();

const options: DataSourceOptions = {
  type: 'mysql',
  host: configService.get(EnvVariables.DB_HOST),
  port: Number(configService.get(EnvVariables.DB_PORT)),
  username: configService.get(EnvVariables.DB_USERNAME),
  password: configService.get<string>(EnvVariables.DB_PASSWORD),
  database: configService.get(EnvVariables.DB_DATABASE),
  entities: [EnvConstants.TYPEORM_ENTITIES_DIR],
  logging: Boolean(configService.get(EnvConstants.TYPEORM_LOGGIN)),
  migrationsTableName: EnvConstants.TYPEORM_MIGRATIONS_TABLENAME,
  migrations: [EnvConstants.TYPEORM_MIGRATIONS_DIR],
};

export default new DataSource(options);
