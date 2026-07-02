import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/homepage')
@UseGuards(JwtAuthGuard)
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get()
  findAll() {
    return this.homepageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homepageService.findOne(id);
  }

  @Post()
  create(@Body() createHomepageDto: any) {
    return this.homepageService.create(createHomepageDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHomepageDto: any) {
    return this.homepageService.update(id, updateHomepageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homepageService.remove(id);
  }
}
