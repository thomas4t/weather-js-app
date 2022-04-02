import { Field, ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { User } from '@App/User/Application/user.gql'

@ObjectType()
export class UserLogin {
  constructor(user: User, token: string) {
    this.token = token
    this.id = user.id
    this.createdAt = user.createdAt
  }

  @Field(() => String, { nullable: true })
  token?: string

  @Field(() => ID, { nullable: true })
  id?: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: string
}
