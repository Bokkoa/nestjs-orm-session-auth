import { Exclude } from "class-transformer";
import { ReportEntity } from '../reports/report.entity';
import {
        Entity, 
        Column, 
        PrimaryGeneratedColumn, 
        AfterInsert, 
        AfterRemove, 
        AfterUpdate,
        OneToMany,
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


    @OneToMany( () => ReportEntity, ( report ) => report.user)
    reports: ReportEntity[]

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