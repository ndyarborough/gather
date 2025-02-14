import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  // Get all messages for a user
  async getUserMessages(userId: number) {
    return this.prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  // Send a new message and save it to the database
  async sendMessage(senderId: number, receiverId: number, content: string) {
    const message = await this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
    return message; // Return the created message
  }

  // Get all messages between two users
  async getMessageHistory(senderId: number, receiverId: number) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  // Send a "Hi" message to the event host
  async sendHiMessage(senderId: number, receiverId: number, eventId?: number) {
    return this.prisma.message.create({
      data: {
        senderId,
        receiverId: receiverId,
        content: 'Hi',
        ...(eventId ? { eventId } : {}), // Only add eventId if it's provided
      },
    });
  }
}
