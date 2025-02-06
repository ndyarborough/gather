import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'; // Import join
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    EventsModule,
    PrismaModule,
    UsersModule,
    MulterModule.register({
      dest: './uploads', // Where profile pictures will be stored
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the folder where your files are stored
      serveRoot: '/uploads', // URL path to access the static files
    }),
    MessagesModule,
  ],
})
export class AppModule { }
