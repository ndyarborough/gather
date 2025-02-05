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
import { CreateEventDto } from './dto/create-event.dto';
import { multerConfig } from '../config/multer-config'; // Same config used in UsersController

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const imagePath = image ? image.path : undefined;
    return this.eventsService.createEvent(createEventDto, imagePath);
  }

  @Get()
  getAll() {
    return this.eventsService.getEvents();
  }
}
