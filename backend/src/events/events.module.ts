import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Import the PrismaModule

@Module({
  imports: [PrismaModule], // Import the PrismaModule to inject PrismaService
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
