import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

interface PrivateUserData {
  events: string[];
  rsvps: string[];
  interests: string[];
}

interface EventIdOnly {
  id: number;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Register User
  async create(
    email: string,
    fullName: string,
    password: string,
    profilePic?: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        profilePic, // Stores only filename if profilePic is provided
      },
    });
  }

  // Login User
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
    };
  }

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new UnauthorizedException('no user with this id');
    return user;
  }

  async getUserInterests(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        interestedEvents: true,
      },
    });
    if (!user) throw new UnauthorizedException('no user with this id');
    return user.interestedEvents;
  }

  async getUserRsvps(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        attendingEvents: true,
      },
    });
    if (!user) throw new UnauthorizedException('no user with this id');
    return user.attendingEvents;
  }

  async getPrivateUserData(userId: number): Promise<PrivateUserData> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        hostedEvents: { select: { id: true } },
        attendingEvents: { select: { id: true } },
        interestedEvents: { select: { id: true } },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      events: user.hostedEvents.map((event: EventIdOnly) => {
        return event.id.toString();
      }),
      rsvps: user.attendingEvents.map((event: EventIdOnly) => {
        return event.id.toString();
      }),
      interests: user.interestedEvents.map((event: EventIdOnly) => {
        return event.id.toString();
      }),
    };
  }

  async updateProfilePic(userId: string, profilePicPath: string) {
    console.log('Trying to update profile pic...');
    const userIdInt = parseInt(userId, 10);
    console.log('userID: ', userIdInt);
    if (isNaN(userIdInt)) {
      throw new Error('Invalid user ID');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userIdInt },
      data: { profilePic: profilePicPath },
    });

    console.log('Updated user:', updatedUser);
    return updatedUser;
  }
}
