import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ScheduleModule } from '@nestjs/schedule'
import { EventEmitterModule } from '@nestjs/event-emitter'
import * as Sentry from '@sentry/node'
import { GraphQLError } from 'graphql'
import { HomeModule } from './App/Home/home.module'
import { ProductModule } from './App/Product/product.module'
import { ProductTagModule } from './App/ProductTag/productTag.module'
import { TopCategoryModule } from './App/TopCategory/topCategory.module'
import { UserModule } from './App/User/user.module'
import { UserLoginModule } from './App/UserLogin/userLogin.module'
import { OrderModule } from './App/Order/order.module'
import ormConfig from '../ormconfig'

Sentry.init({
  dsn: process.env.BACKEND__SENTRY_DSN,
  environment: process.env.APP_ENV || 'unknown',
  release: process.env.APP_VERSION,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.3 : 1.0,
})

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...ormConfig.options,
      synchronize: process.env.NODE_ENV !== 'production', // on production use migrations instead of synchronize
      entities: [`${__dirname}/App/**/*.entity.{ts,js}`],
      migrations: [`${__dirname}/src/migrations/*.ts`],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: true,
      introspection: true, // for graphql-mesh. security risk: i need to find a way how to turn this off in future
      formatError: (error: GraphQLError) => {
        // format validation errors from ValidationPipe
        if (error.extensions.code === 'BAD_USER_INPUT') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const messages = error.extensions.response.message
          if (Array.isArray(messages)) {
            const errorCodes: { code: string; message: string }[] = []
            messages.forEach((errorMessage: string) => {
              errorCodes.push({
                code: `${errorMessage.replace(/ .*/, '').toUpperCase()}_BAD_INPUT`,
                message: errorMessage,
              })
            })

            return {
              customAttributes: errorCodes,
              message: 'Validation error',
              code: 'BAD_USER_INPUT',
            }
          }
        }

        return error
      },
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    HomeModule,
    ProductModule,
    ProductTagModule,
    TopCategoryModule,
    UserModule,
    UserLoginModule,
    OrderModule,
  ],
})
export class AppModule {}
