import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { multerConfig } from '../config/multer-config';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePic', multerConfig))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() profilePic?: Express.Multer.File, // ✅ Fix Multer File Type
  ) {
    const profilePicPath = profilePic ? profilePic.path : undefined; // ✅ Fix null issue
    return this.usersService.create(createUserDto, profilePicPath);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }
}
