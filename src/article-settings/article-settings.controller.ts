import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ArticleSettingsService } from './article-settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('api/article-settings')
export class ArticleSettingsController {
  constructor(private service: ArticleSettingsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  getSettings() { return this.service.getSettings(); }
  @UseGuards(JwtAuthGuard)
  @Put()
  updateSettings(@Body() dto: any) { return this.service.updateSettings(dto); }
}
