import { gql } from 'graphql-request'

export default (): string => gql`
  query me {
    me {
      id
      avatarUrl
      email
    }
  }
`
