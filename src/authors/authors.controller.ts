import { Controller, Get, Post, Body, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/authors')
@UseGuards(JwtAuthGuard)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Post()
  create(@Body() createAuthorDto: any) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: any) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
