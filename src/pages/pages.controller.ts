import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PagesService } from './pages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/pages')
@UseGuards(JwtAuthGuard)
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Post()
  create(@Body() createPageDto: any) {
    return this.pagesService.create(createPageDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePageDto: any) {
    return this.pagesService.update(id, updatePageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }
}
