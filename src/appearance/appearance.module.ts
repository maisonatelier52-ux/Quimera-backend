import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppearanceController } from './appearance.controller';
import { AppearanceService } from './appearance.service';
import { Appearance, AppearanceSchema } from './appearance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appearance.name, schema: AppearanceSchema }])
  ],
  controllers: [AppearanceController],
  providers: [AppearanceService],
  exports: [AppearanceService],
})
export class AppearanceModule {}
