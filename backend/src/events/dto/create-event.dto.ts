import { IsNotEmpty, IsOptional, IsString, IsDateString, IsInt } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsInt()
  @IsNotEmpty()
  hostId: number;

  @IsOptional()
  @IsString()
  image?: string;
}
