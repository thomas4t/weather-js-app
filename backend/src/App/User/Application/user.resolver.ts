import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@App/Auth/auth.guard'
import { UserService } from '../Domain/user.service'
import { User } from './user.gql'

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { description: 'Returns info about logged user. Put your Bearer token in Authorization header.' })
  @UseGuards(new AuthGuard())
  async me(@Context('user') ctxUser: { id: string }): Promise<User> {
    const user = await this.userService.getUserById(ctxUser.id)
    return user
  }

  @Mutation(() => User)
  async userRegister(@Args('email') email: string, @Args('password') password: string): Promise<User> {
    const user = await this.userService.createUser(email, password)
    return user
  }
}
