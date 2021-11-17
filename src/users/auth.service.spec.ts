import { BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AuthService } from './auth.service';
import { UserEntity } from "./user.entity";
import { UsersService } from './users.service';

describe('AuthService', () => {

    let service:AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach( async () => {

        const users: UserEntity[] = [];

        // + ======== +
        // |   MOCK   |
        // + ======== +
        // create a fake copy of user service 
        // (Partial helps to no create the complete userservice class)
        fakeUserService = {
            find: ( email: string) => {

                const filteredUsers = users.filter( user => user.email === email)

                return Promise.resolve(filteredUsers);

            },
            create: ( email: string, password: string) => {

                let user = {id: Math.floor(Math.random() * 9999), email, password} as UserEntity;
                users.push(  user );

                return Promise.resolve( user );
            }
                
        };


        // creating a module
        const module = await Test.createTestingModule({
            providers: [ AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                } ]
        }).compile();


        service = module.get(AuthService)

    });


    it('can create an instance of auth service', async () => {

        expect(service).toBeDefined();

    });


    it(' create a new user with a salted and hashed password', async () => {
        
        const user = await service.signup('ansuz@a.com', 'asdf');

        expect(user.password).not.toEqual('asdf');


        const [salt, hash] = user.password.split('.');

        expect(salt).toBeDefined();
        expect(hash).toBeDefined();

    });


    it('Trhows an error if users signs up with email that is already in use', async () => {

        await service.signup('b@b.com', 'ansuz');

        await expect(service.signup('b@b.com', 'asdf')).rejects.toThrowError(BadRequestException);

    });


    it('throws if signin is called with an unsused email', async () => {

            await  expect( service.signin('asd@asd.com', 'asdfasd') )
                            .rejects.toThrowError(NotFoundException);

    });


    it('throws if an invalid password is provided', async () => {

        await service.signup(
            'Ansuz@asddf.com', '0absy'
        );

        await expect( service.signin('Ansuz@asddf.com', '0absyz') )
                        .rejects.toThrowError( BadRequestException );


    });


    it('returns a user if correct credentials are provided', async() => {
        
        await service.signup('a@a.com', 'pass');

        const user = await service.signin('a@a.com', 'pass');

        expect( user ).toBeDefined();


    });

});
