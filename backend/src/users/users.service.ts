import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

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
