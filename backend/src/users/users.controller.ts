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
  @UseInterceptors(FileInterceptor('profilePic')) // Intercept the file upload
  async uploadProfilePic(
    @Param('userId') userId: string, // Get userId as string from the route
    @UploadedFile() file: Express.Multer.File, // Handle the file upload
  ) {
    // Handle file upload
    if (file) {
      const profilePicPath = `uploads/${file.filename}`; // Define your path for storing the file

      // Now you can update the user's profilePic using the new file path
      const updatedUser = await this.usersService.updateProfilePic(
        userId,
        profilePicPath,
      );

      return updatedUser;
    } else {
      throw new Error('No file uploaded');
    }
  }
}
