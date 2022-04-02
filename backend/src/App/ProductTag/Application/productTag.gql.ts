import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProductTag {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  name?: string
}
