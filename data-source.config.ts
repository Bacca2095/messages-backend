import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { EnvConstants } from './src/config/environment/env-constants.enum';
import { EnvVariables } from './src/config/environment/env-variables.enum';

if (process.cwd().includes('dist')) {
  config();
}

if (!process.cwd().includes('dist')) {
  config({ path: `./env/development.env` });
}

const configService = new ConfigService();

const options: DataSourceOptions = {
  type: 'mariadb',
  host: configService.get<string>(EnvVariables.DB_HOST),
  port: Number(configService.get<number>(EnvVariables.DB_PORT)),
  username: configService.get<string>(EnvVariables.DB_USERNAME),
  password: configService.get<string>(EnvVariables.DB_PASSWORD),
  database: configService.get<string>(EnvVariables.DB_DATABASE),
  entities: [EnvConstants.TYPEORM_ENTITIES_DIR],
  logging: Boolean(configService.get<boolean>(EnvVariables.TYPEORM_LOGGING)),
  migrationsTableName: EnvConstants.TYPEORM_MIGRATIONS_TABLENAME,
  migrations: [EnvConstants.TYPEORM_MIGRATIONS_DIR],
};

export default new DataSource(options);
