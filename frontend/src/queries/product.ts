import { gql } from 'graphql-request'

export default (): string => gql`
  query getProduct {
    getProductByName(name: "Vladimir") {
      id
      name
      description
      availableCount
    }
  }
`
