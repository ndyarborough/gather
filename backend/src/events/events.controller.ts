import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseIntPipe,
  Delete,
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
    @Body('date') date: string,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
    @Body('hostId') hostId: string,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const imagePath = image ? image.path : undefined;
    return this.eventsService.createEvent(
      name,
      description,
      new Date(date),
      new Date(startTime),
      new Date(endTime),
      parseInt(hostId, 10),
      imagePath,
    );
  }

  @Get()
  getAll() {
    return this.eventsService.getEvents();
  }

  @Get(':eventId')
  getOne(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.eventsService.findEventById(eventId);
  }

  @Post(':eventId/rsvp/:userId')
  async rsvp(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.eventsService.rsvp(eventId, userId);
  }

  @Delete(':eventId/unrsvp/:userId')
  async unRsvp(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.eventsService.unRsvp(eventId, userId);
  }

  @Post(':eventId/interest/:userId')
  async markInterest(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.eventsService.markInterest(eventId, userId);
  }

  @Delete(':eventId/uninterest/:userId')
  async removeInterest(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.eventsService.removeInterest(eventId, userId);
  }
}
