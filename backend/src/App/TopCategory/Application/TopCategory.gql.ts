import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TopCategory {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  title?: string
}
