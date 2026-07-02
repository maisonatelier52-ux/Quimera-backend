import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FooterService } from './footer.service';
import { FooterController } from './footer.controller';
import { Footer, FooterSchema } from './footer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Footer.name, schema: FooterSchema }])],
  controllers: [FooterController],
  providers: [FooterService],
})
export class FooterModule {}
