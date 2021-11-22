import { Controller, Post, Body, UseGuards, Patch, Param, Get, Query } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approved-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {

    constructor( private reportService: ReportsService){}

    @UseGuards( AuthGuard )
    @Post()
    @Serialize( ReportDto )
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity ){
        return this.reportService.create(body, user);
    }


    @UseGuards( AdminGuard )
    @Patch('/:id')
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto){
        return this.reportService.changeApproval(id, body.approved);
    }


    @Get()
    getEstimate( @Query() query: GetEstimateDto ){
        return this.reportService.createEstimate( query );
    }

}
