import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../Auth.guard';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';
import { CreateReportsDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseInterceptors(CurrentUserInterceptor)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  newReport(@Body() body: CreateReportsDto, @Request() req: any) {
    return this.reportsService.create(body, req.currentUser);
  }
}
