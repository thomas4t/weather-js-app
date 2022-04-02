import { Field, InputType, registerEnumType } from '@nestjs/graphql'

export enum SortOrder {
  asc = 'ASC',
  desc = 'DESC',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: '',
})

@InputType()
export abstract class StringFilter {
  @Field({ nullable: true })
  eq?: string

  @Field({ nullable: true })
  contains?: string
}
