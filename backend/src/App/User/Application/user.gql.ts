import { Field, ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field(() => String)
  email: string

  @Field(() => String)
  avatarUrl?: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: string
}
