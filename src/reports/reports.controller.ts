import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';


@Controller('reports')
export class ReportsController {

    constructor( private reportService: ReportsService){}

    @UseGuards( AuthGuard )
    @Post()
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity ){
        return this.reportService.create(body, user);
    }

}
