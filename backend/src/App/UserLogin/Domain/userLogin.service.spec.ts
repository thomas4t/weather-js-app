import { Test, TestingModule } from '@nestjs/testing'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@App/User/Domain/user.entity'
import { UserService } from '@App/User/Domain/user.service'
import { UserLoginService } from './userLogin.service'

const testUser = new User()
testUser.email = 'user@inventi.cz'
testUser.passwordHash =
  '2ab46cab121d5077a17cc5e57a1cf4375c4ba34510c20477f96374818d96895c15a1196ee56f7018cc9fe583be3740715f056c550a106a2518631a4ebfe6b49b' // in-venti
testUser.passwordSalt =
  '1eefa0234cd9acb096f9a5e92ffc289bd4408150dfb3f754aebfd7f248ccaa5238a0a2674976fadf22162374beac397101af08acd17573ccbf1db00cadb8f7c279f416561f27ccdff88e9cc4bc906eb857feb4f29823f729b32d2d5f87f8bba5511e939b7be1ef5cb179b41b39cefa0ec679bc11c2258ac35001b38b0c006953'

describe('UserLoginService', () => {
  let service: UserLoginService
  let repo: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(testUser),
            create: jest.fn().mockReturnValue(testUser),
            save: jest.fn(),
          },
        },
        EventEmitter2,
        UserLoginService,
      ],
    }).compile()

    service = module.get(UserLoginService)
    repo = module.get(getRepositoryToken(User))
  })

  it('should NOT login with wrong password', () => {
    const repoSpy = jest.spyOn(repo, 'findOne')
    const prom = expect(service.verifyLogin(testUser.email, 'bad password')).rejects.toEqual('User password does not match.')
    expect(repoSpy).toBeCalledTimes(1)
    return prom
  })

  it('should login', async () => {
    const repoSpy = jest.spyOn(repo, 'findOne').mockReturnValueOnce(Promise.resolve(testUser))
    const loginValue = await service.verifyLogin(testUser.email, 'in-venti')
    expect(loginValue).toEqual(testUser)
    expect(repoSpy).toBeCalledWith({ where: { email: testUser.email } })
  })
})
