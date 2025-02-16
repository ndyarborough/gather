import {
  Controller,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { multerConfig } from '../config/multer-config';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePic', multerConfig))
  async create(
    @Body('email') email: string,
    @Body('fullName') fullName: string,
    @Body('password') password: string,
    @UploadedFile() profilePic?: Express.Multer.File, // Extracts file from request
  ) {
    const profilePicPath = profilePic ? profilePic.filename : undefined;
    return this.usersService.create(email, fullName, password, profilePicPath);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.usersService.login(email, password);
  }

  @Post(':userId/uploadProfilePic')
  @UseInterceptors(FileInterceptor('profilePic', multerConfig)) // ✅ Apply multerConfig
  async uploadProfilePic(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File, // Handle uploaded file
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const profilePicPath = `uploads/${file.filename}`; // ✅ Correctly assign file path
    console.log('Saved file path:', profilePicPath);

    // Update user's profile picture
    const updatedUser = await this.usersService.updateProfilePic(
      userId,
      profilePicPath,
    );

    return updatedUser
      ? { success: true, profilePicUrl: profilePicPath }
      : { success: false, message: 'Failed to update user' };
  }
}
