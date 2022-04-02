import { AdvancedConsoleLogger, QueryRunner } from 'typeorm'
import * as Sentry from '@sentry/node'

const captureError = (error: string) => {
  if (process.env.BACKEND__SENTRY_DSN) Sentry.captureException(new Error(`TypeOrm error: ${error}`))
}

const captureWarning = (message: string) => {
  if (process.env.BACKEND__SENTRY_DSN) Sentry.captureMessage(`TypeOrm warning: ${message}`)
}

export class SentryAdvancedConsoleLogger extends AdvancedConsoleLogger {
  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    super.logQueryError(error, query, parameters, queryRunner)
    captureError(`${error} on query ${query}`)
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    super.logQuerySlow(time, query, parameters, queryRunner)
    captureWarning(`Slow query (${time}s) on SQL: ${query}`)
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    super.logQuery(level, message, queryRunner)
    if (level === 'warn') captureWarning(message)
  }
}
