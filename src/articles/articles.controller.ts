import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/articles')
@UseGuards(JwtAuthGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Post()
  create(@Body() createArticleDto: any) {
    return this.articlesService.create(createArticleDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: any) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
