export enum EnvConstants {
  DB_TYPE = 'mysql',
  TYPEORM_ENTITIES_DIR = 'dist/**/*.entity{.ts,.js}',
  TYPEORM_MIGRATIONS_DIR = 'dist/src/config/database/migrations/*.js',
  TYPEORM_MIGRATIONS_TABLENAME = 'migrations',
  TYPEORM_AUTOLOAD_ENTITIES = 'true',
  TYPEORM_CLI_MIGRATIONS_DIR = 'src/migrations',
}
