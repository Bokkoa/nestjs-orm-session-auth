import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {

    constructor( private reportService: ReportsService){}

    @UseGuards( AuthGuard )
    @Post()
    @Serialize( ReportDto )
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity ){
        return this.reportService.create(body, user);
    }

}
