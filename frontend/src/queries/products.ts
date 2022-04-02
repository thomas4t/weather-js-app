import { gql } from 'graphql-request'

export default (): string => gql`
  query getProducts {
    getProducts(sort: [{ field: name, order: asc }], first: 10) {
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
            id
            title
          }
        }
      }
    }
  }
`
