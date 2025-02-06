import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateProfilePicDto } from './dto/update-profile-pic.dto';
import { User } from '@prisma/client';  // Import User from Prisma Client

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Register User
  async create(createUserDto: CreateUserDto, profilePic?: string) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        fullName: createUserDto.fullName,
        password: hashedPassword,
        profilePic
      },
    });
  }

  // Login User
  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { message: 'Login successful', userId: user.id, email: user.email, fullName: user.fullName, profilePic: user.profilePic };
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