import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { ReportEntity } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';

const cookieSession = require('cookie-session');
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({

  imports: [
    
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.env.${process.env.NODE_ENV}`
      }),

      TypeOrmModule.forRoot(),
      // TypeOrmModule.forRootAsync({

      //   inject:[ConfigService],
      //   useFactory: ( config: ConfigService ) => {
      //     return {
      //       type: 'sqlite',
      //       database:  config.get<string>('DB_NAME'),
      //       entities: [ UserEntity, ReportEntity ],
      //       synchronize: true,
      //     }
      //   } 
      // }), 
      UsersModule, 
      ReportsModule],

  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
    })
  }],
})

export class AppModule {

  constructor( private configService: ConfigService){}

  // applying global middleware
  configure(consumer: MiddlewareConsumer){
    
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')]
        })
        ).forRoutes('*');

  }
}
