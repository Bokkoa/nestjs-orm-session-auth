import { Exclude } from "class-transformer";
import {
        Entity, 
        Column, 
        PrimaryGeneratedColumn, 
        AfterInsert, 
        AfterRemove, 
        AfterUpdate,
} from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;


    @AfterInsert()
    logInsert(){
        console.log("Inserted User with id", this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log("Updated User with id", this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log("removed User with id", this.id);
    }
    
}