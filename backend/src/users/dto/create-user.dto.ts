import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  fullName!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsOptional()
  profilePic?: string; // This will store the file path
}
