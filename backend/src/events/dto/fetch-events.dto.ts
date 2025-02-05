import { IsOptional, IsString, IsDateString, IsInt } from 'class-validator';

export class FetchEventsDto {
  @IsOptional()
  @IsString()
  name?: string; // Filter by event name

  @IsOptional()
  @IsString()
  description?: string; // Filter by event description

  @IsOptional()
  @IsDateString()
  date?: string; // Filter by event date (ISO string)

  @IsOptional()
  @IsString()
  startTime?: string; // Filter by start time

  @IsOptional()
  @IsString()
  endTime?: string; // Filter by end time

  @IsOptional()
  @IsInt()
  hostId?: number; // Filter by host ID

  @IsOptional()
  @IsInt()
  page?: number; // Pagination: which page to fetch (default: 1)

  @IsOptional()
  @IsInt()
  pageSize?: number; // Pagination: how many events per page (default: 10)
}