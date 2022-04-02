import { gql } from 'graphql-request'

export default (): string => gql`
  mutation orderPlace {
    orderPlace(newOrder: { id: "83b964d2-fda2-4dd7-be20-bdc89b2aa560" }) {
      status
    }
  }
`
