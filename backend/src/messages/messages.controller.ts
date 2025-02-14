import { Controller, Post, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  // Get all messages for a user
  @Get(':userId')
  async getUserMessages(@Param('userId') userId: string) {
    return this.messagesService.getUserMessages(Number(userId));
  }

  // Send a new message
  @Post('/:senderId/:receiverId/:content')
  async sendMessage(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
    @Param('content') content: string,
  ) {
    return this.messagesService.sendMessage(
      Number(senderId),
      Number(receiverId),
      content,
    );
  }

  // say hi
  @Post('hi/:senderId/:receiverId/:eventId')
  async sendHiMessage(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.messagesService.sendHiMessage(
      Number(senderId),
      Number(receiverId),
      Number(eventId),
    );
  }

  // Get message history between two users
  @Get(':senderId/:receiverId')
  async getMessageHistory(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ) {
    return this.messagesService.getMessageHistory(
      Number(senderId),
      Number(receiverId),
    );
  }
}
