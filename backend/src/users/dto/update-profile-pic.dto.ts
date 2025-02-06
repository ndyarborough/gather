import { IsString, IsOptional } from 'class-validator';

export class UpdateProfilePicDto {
  @IsString()
  @IsOptional()
  profilePic?: string; // The path or URL of the uploaded profile picture
}
