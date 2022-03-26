import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateReportsDto {

  @IsNumber()
  @Min(0)
  @Max(100)
  milege: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Max(2050)
  @Min(2000)
  @IsNumber()
  year: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsNumber()
  @Min(2000)
  price: number;
}
