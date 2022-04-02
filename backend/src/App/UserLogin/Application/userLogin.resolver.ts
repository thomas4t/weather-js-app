import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UserLoginService } from '../Domain/userLogin.service'
import { UserLogin } from './userLogin.gql'

@Resolver(() => UserLogin)
export class UserLoginResolver {
  constructor(private userLoginService: UserLoginService) {}

  @Mutation(() => UserLogin)
  async userLogin(@Args('email') email: string, @Args('password') password: string): Promise<UserLogin> {
    try {
      const user = await this.userLoginService.verifyLogin(email, password)
      return new UserLogin(user, this.userLoginService.createToken(user))
    } catch (errorMessage) {
      throw new Error(errorMessage)
    }
  }
}
