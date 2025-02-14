import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventsService } from './events.service';
import { multerConfig } from '../config/multer-config'; // Same config used in UsersController

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  create(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('date') date: Date,
    @Body('startTime') startTime: Date,
    @Body('endTime') endTime: Date,
    @Body('hostId') hostId: string,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const imagePath = image ? image.path : undefined;
    return this.eventsService.createEvent(
      name,
      description,
      date,
      startTime,
      endTime,
      hostId,
      imagePath,
    );
  }

  @Get()
  getAll() {
    return this.eventsService.getEvents();
  }
}
