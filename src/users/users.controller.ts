import { 
        Body, 
        Controller, 
        Post, 
        Patch, 
        Param, 
        Query, 
        Get, 
        Delete, 
        Session,
        NotFoundException,
        UseGuards
    } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto) // can be used here or in specific controller method
export class UsersController {

    constructor( 
        private authService: AuthService,
        private userService: UsersService ){}


    @Get('/colors/:color')
    setColor(@Param('color') color:string, @Session() session: any){

        session.color = color;

    }

    @Get('/colors')
    getColors(@Session() session: any){
        return session.color;
    }

    // @Get('/whoami')
    // whoAmI(@Session() session:any){
    //     return this.userService.findOne( session.userId );
    // }


    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: UserEntity){
        return user;
    }

    @Post('/signout')
    signOut(@Session() session:any){
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto,  @Session() session: any){

        const user = this.authService.signup(body.email, body.password)

        session.userId = (await user).id;

        return user;
    }


    @Post('/signin')
    async signIn( @Body() body: CreateUserDto, @Session() session: any){
        
        const user = this.authService.signin(body.email, body.password);

        session.userId = (await user).id;

        return user;
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto) ) // for hidde password
    @Get('/:id')
    findUser(@Param('id') id: string ){
        
        console.log("handler is running");

        const user = this.userService.findOne( parseInt( id ));
        if(!user){
            throw new NotFoundException('user not found');
        }

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string ){
        return this.userService.remove( parseInt(id) );
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string,  @Body() body: UpdateUserDto ){
        return this.userService.update( parseInt(id), body);
    }

}


