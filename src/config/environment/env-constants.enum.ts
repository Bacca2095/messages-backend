export enum EnvConstants {
  DB_TYPE = 'mysql',
  TYPEORM_ENTITIES_DIR = './**/*.entity{.ts,.js}',
  TYPEORM_MIGRATIONS_DIR = './**/config/database/migrations/*{.ts,.js}',
  TYPEORM_MIGRATIONS_TABLENAME = 'migrations',
  TYPEORM_AUTOLOAD_ENTITIES = 'true',
  TYPEORM_CLI_MIGRATIONS_DIR = './src/config/database/migrations',
}
