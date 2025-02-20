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
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        hostId: parseInt(hostId as unknown as string, 10), // Convert to integer
        image: imagePath,
      },
    });
  }

  async updateRSVPStatus(
    userId: number,
    eventId: number,
    status: 'RSVP' | 'INTEREST',
  ) {
    return this.prisma.$transaction(async (prisma) => {
      // Remove any existing RSVP or interest
      await prisma.rSVP.deleteMany({
        where: { userId, eventId },
      });

      await prisma.interest.deleteMany({
        where: { userId, eventId },
      });

      // Add the new status
      if (status === 'RSVP') {
        return prisma.rSVP.create({
          data: { userId, eventId },
        });
      } else if (status === 'INTEREST') {
        return prisma.interest.create({
          data: { userId, eventId },
        });
      }
    });
  }

  async getEvents() {
    return this.prisma.event.findMany();
  }
}
