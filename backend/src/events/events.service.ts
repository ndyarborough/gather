import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(createEventDto: CreateEventDto, imagePath?: string) {
    return this.prisma.event.create({
      data: {
        name: createEventDto.name,
        description: createEventDto.description,
        date: new Date(createEventDto.date),
        startTime: new Date(`${createEventDto.date}T${createEventDto.startTime}:00Z`),
        endTime: new Date(`${createEventDto.date}T${createEventDto.endTime}:00Z`),
        hostId: createEventDto.hostId,
        image: imagePath,
      },
    });
  }

  async getEvents() {
    return this.prisma.event.findMany();
  }
}
