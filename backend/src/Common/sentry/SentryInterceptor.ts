import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { catchError, Observable } from 'rxjs'
import * as Sentry from '@sentry/node'

const captureException = (exception: Error) => {
  if (process.env.BACKEND__SENTRY_DSN) Sentry.captureException(exception)
}

export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle() is an Observable of the controller's result value
    return next.handle().pipe(
      catchError((error) => {
        captureException(error)
        throw error
      }),
    )
  }
}
