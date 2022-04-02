/* eslint-disable @typescript-eslint/ban-types */
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../app.module'

export interface AppContext {
  app?: INestApplication
}

const gqlDefaultEndpoint = '/graphql'

export const createBeforeAll = (context: { app?: INestApplication }) => async () => {
  // create app
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()
  const app = moduleFixture.createNestApplication()
  context.app = app
  await app.init()
}

export const createAfterAll = (context: { app?: INestApplication }) => async () => {
  await context?.app.close()
}

const graphqlSupertest = (app: INestApplication, data: string | object): request.Test => {
  return request(app.getHttpServer()).post(gqlDefaultEndpoint).expect(200).send(data)
}

export default graphqlSupertest
