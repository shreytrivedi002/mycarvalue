import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportsDto } from './dtos/create-report.dto';
import { ReportsEntity } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportsEntity)
    private reportRepository: Repository<ReportsEntity>,
  ) {}

  async create(data: CreateReportsDto, user: any) {
    console.log(data, user);

    const report = this.reportRepository.create(data);
    report.user = user;
    return this.reportRepository.save(report);
  }
}
