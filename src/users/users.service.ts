import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository  } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity> ){
    }

    create( email: string, password: string ){

        const user = this.userRepo.create({email, password});

        // if we not use create (insert object directly ) hooks doesnt trigger
        return this.userRepo.save( user );

    }


    findOne(id: number){

        if(!id){
            return null;
        }

        return this.userRepo.findOne({id});
    }

    find(email: string){
        return this.userRepo.find({ email });
    }

    // Partial serves that the object have at least one of the properties of  entity
    async update(id: number, attrs:Partial<UserEntity>){

        const user = await this.findOne(id);

        if(!user){
            throw new NotFoundException('user not found');
        }

        // Update given properties
        Object.assign(user, attrs);

        return this.userRepo.save( user );

    }

    async remove(id: number){
        
        const user = await this.findOne( id );

        if(!user){
            throw new NotFoundException('user not found');
        }

        return this.userRepo.remove( user );

    }
}
