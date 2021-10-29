import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';


// This indicates that whatever that i get must be a class
interface ClassContructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassContructor){
    return UseInterceptors( new SerializeInterceptor( dto ));
}

export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto: any ){}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> | Promise<Observable<any>> {

        // // RUN SOMETHING BEFORE A REQUEST IS HANDLED
        // // BY THE REQUEST HANDLER
        // console.log('Im running before the handler', context);

        // set custom serialization with DTO AS param
        return handler.handle().pipe(
            map( (data: any)  => {

                return plainToClass( this.dto, data, {
                    excludeExtraneousValues: true,
                });
                // // run something before the response is sent out
                // console.log('Im running before response is sent out', data);

            })
        )
    }

}