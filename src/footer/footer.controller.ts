import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { FooterService } from './footer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/footer')
@UseGuards(JwtAuthGuard)
export class FooterController {
  constructor(private readonly footerService: FooterService) {}

  @Get()
  getFooter() {
    return this.footerService.getFooter();
  }

  @Post()
  updateFooter(@Body() updateFooterDto: any) {
    return this.footerService.updateFooter(updateFooterDto);
  }
}
