import { Test } from "@nestjs/testing";
import { AuthService } from './auth.service';
import { UsersService } from './users.service';


it('can create an instance of auth service', async () => {

    // create a fake copy of user service
    const fakeUserService = {
        find: () => Promise.resolve([]),
        create: ( email: string, password: string) => Promise.resolve({id: 1, email, password})
    };

    // creating a module
    const module = await Test.createTestingModule({
        providers: [ AuthService,
            {
                provide: UsersService,
                useValue: fakeUserService
            } ]
    }).compile();


    const service = module.get(AuthService);


    expect(service).toBeDefined();

});