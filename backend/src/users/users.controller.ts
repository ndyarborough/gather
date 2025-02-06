import { Controller, Post, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer-config';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateProfilePicDto } from './dto/update-profile-pic.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Register user
  @Post()
  @UseInterceptors(FileInterceptor('profilePic', multerConfig))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() profilePic?: Express.Multer.File, // ✅ Fix Multer File Type
  ) {
    // If a profile picture is uploaded, pass its path to the service, otherwise undefined
    const profilePicPath = profilePic ? profilePic.path : undefined;
    return this.usersService.create(createUserDto, profilePicPath);
  } 

  // Login user
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  // Update profile pic
  @Post(':userId/uploadProfilePic')
  @UseInterceptors(FileInterceptor('profilePic', multerConfig))
  async updateProfilePic(
    @Param('userId') userId: string,  // The userId is passed as a string
    @UploadedFile() profilePic: Express.Multer.File,
  ) {
    if (!profilePic) {
      throw new Error('No file uploaded');
    }

    const profilePicPath = profilePic.path;
    const updatedUser = await this.usersService.updateProfilePic(userId, profilePicPath);

    return {
      success: true,
      message: 'Profile picture updated successfully',
      profilePicUrl: updatedUser.profilePic,
    };
  }
}