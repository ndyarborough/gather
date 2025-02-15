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

  // Update Profile Pic
  async updateProfilePic(userId: string, profilePicPath: string) {
    const userIdInt = parseInt(userId, 10); // Convert the userId to an integer

    if (isNaN(userIdInt)) {
      throw new Error('Invalid user ID');
    }

    return this.prisma.user.update({
      where: {
        id: userIdInt, // Use the converted integer userId
      },
      data: {
        profilePic: profilePicPath, // Update the profilePic path
      },
    });
  }
}
