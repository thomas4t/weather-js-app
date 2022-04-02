import { DataSourceOptions } from 'typeorm'
import { SentryAdvancedConsoleLogger } from '@Common/sentry/SentryAdvancedConsoleLogger'

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  // logging: process.env.NODE_ENV !== 'production',
  entities: process.argv[2] === 'schema:drop' ? undefined : [`${__dirname}/src/App/**/*.entity.ts`],
}

export default ormconfig
