import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { MoodSurvey, MoodSurveySchema } from './mood-survey.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: MoodSurvey.name, schema: MoodSurveySchema }])],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
