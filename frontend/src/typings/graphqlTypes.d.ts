type Maybe<T> = T | null
type InputMaybe<T> = Maybe<T>
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }

type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number

  DateTime: any
}

type ICategory = {
  id: Scalars['ID']
  product: IProduct
  title?: Maybe<Scalars['String']>
  topCategory?: Maybe<ITopCategory>
}

type IMutation = {
  insertProduct: IProduct
  orderPlace: IOrderPlacedStatus
  userLogin: IUserLogin
  userRegister: IUser
}

type IMutationInsertProductArgs = {
  newProduct: IProductInsertArguments
}

type IMutationOrderPlaceArgs = {
  newOrder: IOrderPlaceArguments
}

type IMutationUserLoginArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

type IMutationUserRegisterArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

type IOrder = {
  id: Scalars['ID']
}

type IOrderFilter = {
  name?: InputMaybe<IStringFilter>
}

type IOrderPlaceArguments = {
  id?: InputMaybe<Scalars['ID']>
}

type IOrderPlacedStatus = {
  status: Scalars['String']
}

type IOrderResult = {
  count: Scalars['Float']
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  results: Array<IOrder>
}

type IOrderSort = {
  field: IOrderSortField
  order: ISortOrder
}

type IPageInfo = {
  endCursor?: Maybe<Scalars['String']>
  hasNextPage?: Maybe<Scalars['Boolean']>
  hasPreviousPage?: Maybe<Scalars['Boolean']>
  startCursor?: Maybe<Scalars['String']>
}

type IProduct = {
  availableCount?: Maybe<Scalars['Float']>
  categories: Array<ICategory>
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  productTags: Array<IProductTag>
}

type IProductFilter = {
  name?: InputMaybe<IStringFilter>
}

type IProductInsertArguments = {
  availableCount?: InputMaybe<Scalars['Int']>
  description: Scalars['String']
  name: Scalars['String']
}

type IProductListConnection = {
  edges: Array<IProductListEdge>
  pageInfo: IPageInfo
  totalCount: Scalars['Float']
}

type IProductListEdge = {
  cursor: Scalars['String']
  node: IProduct
}

type IProductSearchArguments = {
  id?: InputMaybe<Scalars['ID']>
}

type IProductSort = {
  field: IProductSortField
  order: ISortOrder
}

type IProductTag = {
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

type IQuery = {
  getOrders: IOrderResult
  getProduct: IProduct
  getProductByName: IProduct
  getProducts: IProductListConnection

  me: IUser
}

type IQueryGetOrdersArgs = {
  filter?: InputMaybe<Array<IOrderFilter>>
  limit?: InputMaybe<Scalars['Float']>
  offset?: InputMaybe<Scalars['Float']>
  sort?: InputMaybe<Array<IOrderSort>>
}

type IQueryGetProductArgs = {
  productId: IProductSearchArguments
}

type IQueryGetProductByNameArgs = {
  name: Scalars['String']
}

type IQueryGetProductsArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<Array<IProductFilter>>
  first?: InputMaybe<Scalars['Float']>
  last?: InputMaybe<Scalars['Float']>
  sort?: InputMaybe<Array<IProductSort>>
}

type IStringFilter = {
  contains?: InputMaybe<Scalars['String']>
  eq?: InputMaybe<Scalars['String']>
}

type ITopCategory = {
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
}

type IUser = {
  avatarUrl: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  email: Scalars['String']
  id: Scalars['ID']
}

type IUserLogin = {
  createdAt?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  token?: Maybe<Scalars['String']>
}
