type IMeQueryVariables = Exact<{ [key: string]: never }>

type IMeQuery = { me: { id: string; avatarUrl: string; email: string } }

type IOrderPlaceMutationVariables = Exact<{ [key: string]: never }>

type IOrderPlaceMutation = { orderPlace: { status: string } }

type IGetProductQueryVariables = Exact<{ [key: string]: never }>

type IGetProductQuery = { getProductByName: { id: string; name: string; description?: string | null; availableCount?: number | null } }

type IGetProductsQueryVariables = Exact<{ [key: string]: never }>

type IGetProductsQuery = {
  getProducts: {
    totalCount: number
    pageInfo: { hasPreviousPage?: boolean | null; hasNextPage?: boolean | null; startCursor?: string | null; endCursor?: string | null }
    edges: Array<{
      cursor: string
      node: {
        id: string
        name: string
        description?: string | null
        availableCount?: number | null
        productTags: Array<{ id: string; name?: string | null }>
        categories: Array<{ id: string; title?: string | null }>
      }
    }>
  }
}

type IUserLoginMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

type IUserLoginMutation = { userLogin: { __typename: 'UserLogin'; id?: string | null; token?: string | null } }
