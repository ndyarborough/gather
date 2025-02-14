import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RsvpsService {
  constructor(private prisma: PrismaService) {}

  // Get all RSVPs for a specific user
  async getUserRsvps(userId: number) {
    return this.prisma.rSVP.findMany({
      where: {
        userId: userId, // Filter by userId to get only that user's RSVPs
      },
      include: {
        event: true, // Include event details for each RSVP
      },
      orderBy: {
        createdAt: 'asc', // Order RSVPs by creation date
      } as const, // Adding "as const" to ensure the correct type is used
    });
  }
}
