import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/surveys')
@UseGuards(JwtAuthGuard)
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Get()
  findAll() {
    return this.surveysService.findAll();
  }

  @Post()
  create(@Body() createSurveyDto: any) {
    return this.surveysService.create(createSurveyDto);
  }
}
