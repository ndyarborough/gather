import { Injectable, NotFoundException } from '@nestjs/common';
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
    hostId: number,
    imagePath?: string,
  ) {
    return this.prisma.event.create({
      data: {
        name,
        description,
        date,
        startTime,
        endTime,
        hostId,
        image: imagePath,
      },
    });
  }

  async getEvents() {
    return this.prisma.event.findMany({
      include: {
        host: {
          select: {
            id: true,
            fullName: true,
            profilePic: true,
          },
        },
      },
    });
  }

  async findEventById(eventId: number) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        host: {
          select: {
            id: true,
            fullName: true,
            profilePic: true,
          },
        },
      },
    });
    return event;
  }

  async rsvp(eventId: number, userId: number) {
    // Ensure the event and user exist
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!event || !user) {
      throw new NotFoundException('Event or User not found');
    }

    // Remove from interest if user is already interested
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        interestedEvents: { disconnect: { id: eventId } },
      },
    });

    // Add to RSVP
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        attendingEvents: { connect: { id: eventId } },
      },
      include: {
        interestedEvents: true,
        attendingEvents: true,
      },
    });
  }

  async unRsvp(eventId: number, userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        attendingEvents: { disconnect: { id: eventId } },
      },
      include: {
        interestedEvents: true,
        attendingEvents: true,
      },
    });
  }

  async markInterest(eventId: number, userId: number) {
    // Ensure the event and user exist
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!event || !user) {
      throw new NotFoundException('Event or User not found');
    }

    // Remove from RSVP if user is already attending
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        attendingEvents: { disconnect: { id: eventId } },
      },
    });

    // Add to Interested
    return this.prisma.user.update({
      where: { id: userId },
      include: {
        interestedEvents: true,
        attendingEvents: true,
      },
      data: {
        interestedEvents: { connect: { id: eventId } },
      },
    });
  }

  async removeInterest(eventId: number, userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        interestedEvents: { disconnect: { id: eventId } },
      },
      include: {
        interestedEvents: true, // Ensures the interested events are returned
        attendingEvents: true, // Ensures the attending events are returned
      },
    });
  }
}
