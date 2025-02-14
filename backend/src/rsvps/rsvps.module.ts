import { Module } from '@nestjs/common';
import { RsvpsService } from './rsvps.service';
import { RsvpsController } from './rsvps.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule

@Module({
  imports: [PrismaModule], // Make sure PrismaModule is imported here
  controllers: [RsvpsController],
  providers: [RsvpsService],
})
export class RsvpsModule {}
