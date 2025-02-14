import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(
    name: string,
    description: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    hostId: string,
    imagePath?: string,
  ) {
    return this.prisma.event.create({
      data: {
        name,
        description,
        date: new Date(date),
        startTime: new Date(`${date}T${startTime}:00Z`),
        endTime: new Date(`${date}T${endTime}:00Z`),
        hostId: parseInt(hostId as unknown as string, 10), // Convert to integer
        image: imagePath,
      },
    });
  }

  async getEvents() {
    return this.prisma.event.findMany();
  }
}
