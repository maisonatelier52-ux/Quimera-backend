import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MoodSurvey, MoodSurveyDocument } from './mood-survey.schema';

@Injectable()
export class SurveysService {
  constructor(@InjectModel(MoodSurvey.name) private surveyModel: Model<MoodSurveyDocument>) {}

  async findAll() {
    return this.surveyModel.find().sort({ date: -1 }).exec();
  }

  async create(createSurveyDto: any) {
    const createdSurvey = new this.surveyModel(createSurveyDto);
    return createdSurvey.save();
  }
}
