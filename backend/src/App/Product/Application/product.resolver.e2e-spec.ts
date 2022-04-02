import graphqlSupertest, { createBeforeAll, createAfterAll, AppContext } from '@Common/utils/graphqlSupertest'

const newlyAddedProduct = {
  name: 'Vanitas',
  description: 'Calico',
  availableCount: 100,
}

const assertRow = expect.objectContaining({
  name: expect.any(String),
  description: expect.any(String),
  availableCount: expect.any(Number),
})

const assertListRow = expect.objectContaining({
  cursor: expect.any(String),
  node: expect.objectContaining({
    name: expect.any(String),
    description: expect.any(String),
    availableCount: expect.any(Number),
  }),
})

describe('Product Resolver (e2e)', () => {
  const context: AppContext = {}

  beforeAll(createBeforeAll(context))

  afterAll(createAfterAll(context))

  describe('product', () => {
    it('should get the products array', () => {
      return graphqlSupertest(context.app, {
        query: `{
          getProducts (sort: [{ field: name, order: asc }], first: 10) {
            pageInfo {
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
            }
            totalCount
            edges {
              cursor
              node {
                id
                name
                description
                availableCount
                productTags {
                  id
                  name
                }
                categories {
                  title
                }
              }
            }
          }
        }`,
      }).expect((res) => {
        expect(res.body.data.getProducts.edges).toHaveLength(10)
        expect(res.body.data.getProducts.edges).toEqual(expect.arrayContaining([assertListRow]))
      })
    })
    describe('one product', () => {
      it('should get a single product', () => {
        return graphqlSupertest(context.app, {
          query: `{ 
            getProductByName(name:"Vladimir"){
              id
              name
              description
              availableCount
            }
           }`,
        }).expect((res) => {
          expect(res.body.data.getProductByName).toEqual(assertRow)
        })
      })
      it('should get an error for bad name', () => {
        return graphqlSupertest(context.app, {
          query: `{ 
            getProductByName(name:"Unknown"){
              id
              name
              description
              availableCount
            }
           }`,
        }).expect((res) => {
          expect(res.body.data).toBe(null)
          expect(res.body.errors[0].message).toMatch('Could not find any entity of type "Product" matching')
        })
      })
    })
    it('should create a new product and have it added to the array', () => {
      return (
        graphqlSupertest(context.app, {
          query: `
            mutation {
              insertProduct(newProduct: { name: "${newlyAddedProduct.name}", availableCount: ${newlyAddedProduct.availableCount}, description: "${newlyAddedProduct.description}" }) {
                id
                name
                availableCount
                description
              }
            }
          `,
        })
          .expect((res) => {
            expect(res.body.data.insertProduct).toMatchObject(newlyAddedProduct)
          })
          // chain another request to see our original one works as expected
          .then(() =>
            graphqlSupertest(context.app, {
              query: `
            {
              getProducts (sort: [{ field: name, order: asc }], first: 11) {
                edges {
                  cursor
                  node {
                    name
                    description
                    availableCount
                  }
                }
              }
            }
            `,
            }).expect((res) => {
              expect(res.body.data.getProducts.edges).toHaveLength(11)
              expect(res.body.data.getProducts.edges).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({
                    node: {
                      name: newlyAddedProduct.name,
                      description: newlyAddedProduct.description,
                      availableCount: newlyAddedProduct.availableCount,
                    },
                  }),
                ]),
              )
            }),
          )
      )
    })
  })
})
