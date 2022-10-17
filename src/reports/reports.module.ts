import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersDto } from '../users/dto/users.dto';
import { UserEntity } from '../users/user.entity';
// import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ReportsController } from './reports.controller';
import { ReportsEntity } from './reports.entity';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportsEntity, UserEntity])],
  controllers: [ReportsController],
  providers: [ReportsService, UsersService],
})
export class ReportsModule {}
