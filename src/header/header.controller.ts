import { Controller, Get, Post, Body } from '@nestjs/common';
import { HeaderService } from './header.service';

@Controller('api/header')
export class HeaderController {
  constructor(private readonly headerService: HeaderService) {}

  @Get()
  async getHeader() {
    return this.headerService.getHeader();
  }

  @Post()
  async updateHeader(@Body() updateHeaderDto: any) {
    return this.headerService.updateHeader(updateHeaderDto);
  }
}
