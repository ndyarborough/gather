import { Controller, Get, Param } from '@nestjs/common';
import { RsvpsService } from './rsvps.service';

@Controller('rsvps')
export class RsvpsController {
  constructor(private readonly rsvpsService: RsvpsService) {}

  // Get all RSVPs for a specific user
  @Get(':userId')
  async getUserRsvps(@Param('userId') userId: string) {
    // Convert the string 'userId' to a number before passing it to the service
    return this.rsvpsService.getUserRsvps(Number(userId));
  }
}
