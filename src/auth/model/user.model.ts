import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  createdAt: Date
}