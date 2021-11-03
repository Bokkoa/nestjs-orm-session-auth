import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {

  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {

    fakeAuthService = {
      signup: () => {

      },
      signin: () => {
        
      }
    };

    fakeUserService = {
        findOne: (id: number) => {
          return Promise.resolve({ id, email: 'asdf@sadf.com', password: 'asdf'} as UserEntity)
        },

        find: () => {

        },

        remove: () => {

        },

        update: () => {

        }
    };


    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
