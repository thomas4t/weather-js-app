import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { createPasswordHashAndSalt } from './passwordUtils'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  createUser(email: string, password: string): Promise<User> {
    const [passwordHash, passwordSalt] = createPasswordHashAndSalt(password)
    const user = this.userRepo.create({ email, passwordHash, passwordSalt, createdAt: 'NOW()' })
    return this.userRepo.save(user)
  }

  getUserById(id: string) {
    return this.userRepo.findOne({ where: { id } })
  }

  getUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } })
  }
}
