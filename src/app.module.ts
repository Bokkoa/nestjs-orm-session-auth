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

@Module({

  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [ UserEntity, ReportEntity ],
    synchronize: true,
  }), UsersModule, ReportsModule],

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


  // applying global middleware
  configure(consumer: MiddlewareConsumer){
    
    consumer.apply(cookieSession({
      keys: ['asdfasfd']
    })).forRoutes('*');

  }
}
