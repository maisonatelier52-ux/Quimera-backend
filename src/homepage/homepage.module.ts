import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { Homepage, HomepageSchema } from './homepage.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Homepage.name, schema: HomepageSchema }])],
  controllers: [HomepageController],
  providers: [HomepageService],
})
export class HomepageModule {}
