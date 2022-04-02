import { gql } from 'graphql-request'

export default (): string => gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      __typename
      id
      token
    }
  }
`
