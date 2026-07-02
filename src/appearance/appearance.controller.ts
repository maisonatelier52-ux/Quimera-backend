import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AppearanceService } from './appearance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/appearance')
export class AppearanceController {
  constructor(private readonly appearanceService: AppearanceService) {}

  @Get()
  getAppearance() {
    return this.appearanceService.getAppearance();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  updateAppearance(@Body() updateDto: any) {
    return this.appearanceService.updateAppearance(updateDto);
  }
}
