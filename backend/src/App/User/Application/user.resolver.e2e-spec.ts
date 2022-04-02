import graphqlSupertest, { createBeforeAll, createAfterAll, AppContext } from '@Common/utils/graphqlSupertest'

describe('User Resolver (e2e)', () => {
  const context: AppContext = {}

  beforeAll(createBeforeAll(context))

  afterAll(createAfterAll(context))

  describe('User', () => {
    it('should not work, unauthorized me me', async () => {
      await graphqlSupertest(context.app, {
        query: `query { me { id } }`,
      }).expect((res) => {
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].message).toEqual('Forbidden resource')
      })
    })

    it('should register, login and get me', async () => {
      await graphqlSupertest(context.app, {
        query: `mutation { userRegister(email: "donald@bar.baz", password: "in-venti") { id email } }`,
      }).expect((res) => {
        expect(res.body.data.userRegister).toMatchObject({ email: 'donald@bar.baz' })
      })

      let token
      await graphqlSupertest(context.app, {
        query: `mutation { userLogin(email: "donald@bar.baz", password: "in-venti") { token } }`,
      }).expect((res) => {
        expect(res.body.data.userLogin?.token).toBeTruthy()
        token = res.body.data.userLogin.token
      })

      await graphqlSupertest(context.app, {
        query: `query { me { id } }`,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body.data.me.id).toBeTruthy()
        })
    })
  })
})
