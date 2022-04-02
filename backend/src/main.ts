/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SentryInterceptor } from '@Common/sentry/SentryInterceptor'
import { AppModule } from './app.module'

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new SentryInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port)
  console.log(`> App started http://localhost:${port}`)
}
bootstrap()
