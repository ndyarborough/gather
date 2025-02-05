import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [EventsModule, PrismaModule, UsersModule,  MulterModule.register({
    dest: './uploads', // Where profile pictures will be stored
  }),],
})
export class AppModule {}
