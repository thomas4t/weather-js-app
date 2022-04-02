import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { UserService } from './user.service'

const testUser = new User()
testUser.email = 'user@inventi.cz'

describe('UserService', () => {
  let service: UserService
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
      ],
    }).compile()

    service = module.get(UserService)
    repo = module.get(getRepositoryToken(User))
  })

  describe('getUserByEmail', () => {
    it('should return an user', async () => {
      const repoSpy = jest.spyOn(repo, 'findOne')
      const user = await service.getUserByEmail(testUser.email)
      expect(user).toMatchObject({ email: testUser.email })
      expect(repoSpy).toBeCalledTimes(1)
    })
  })

  describe('createUser', () => {
    it('should register', async () => {
      const repoSpy = jest.spyOn(repo, 'save')
      await service.createUser(testUser.email, 'in-venti')
      expect(repoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          email: testUser.email,
        }),
      )
    })
  })
})
