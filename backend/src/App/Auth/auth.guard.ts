import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { verifyToken } from '../User/Domain/passwordUtils'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext()
    if (!ctx.req.headers.authorization) {
      return false
    }
    ctx.user = await this.validateToken(ctx.req.headers.authorization)
    return true
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    const token = auth.split(' ')[1]

    try {
      const decoded = verifyToken(token)
      return decoded
    } catch (err) {
      const message = `Token error: ${err.message || err.name}`
      throw new HttpException(message, HttpStatus.UNAUTHORIZED)
    }
  }
}
