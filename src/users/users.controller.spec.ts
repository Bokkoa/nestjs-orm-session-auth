import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {

  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {

    fakeAuthService = {
      // signup: () => {

      // },
      signin: (email: string, password: string) => {
        return Promise.resolve({id: 1, email, password} as UserEntity);
      }
    };

    fakeUserService = {
        findOne: (id: number) => {
          return Promise.resolve({ id: 9999, email: 'asdf@sadf.com', password: 'asdf'} as UserEntity)
        },

        find: (email:string) => {
          return Promise.resolve([{id: 1, email, password: 'aadfsf'} as UserEntity])
        },

        // remove: () => {

        // },

        // update: () => {

        // }
    };


    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],

      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {

    const users = await controller.findAllUsers('asdf@sadf.com');

    expect( users.length ).toEqual(1);
    expect(users[0].email).toEqual('asdf@sadf.com');


  });

  it('FindUser return single user with given id', async () => {
     const user = await controller.findUser('1');

     expect( user ).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
      fakeUserService.findOne = () =>  null;

      await expect(controller.findUser('12')).rejects.toThrowError(NotFoundException);

  });


  it('signin updates session object and returns userr', async () => {

    const session = { userId: -10};


    const user = await controller.signIn({
      email: 'asdf@asdf.com',
      password: '12312' },
      session
    );

    expect( user.id ).toEqual(1);
    expect( session.userId ).toEqual(1);

  });

});
