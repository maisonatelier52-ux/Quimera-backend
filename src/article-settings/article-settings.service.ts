import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleSettings, ArticleSettingsDocument } from './article-settings.schema';
@Injectable()
export class ArticleSettingsService {
  constructor(@InjectModel(ArticleSettings.name) private model: Model<ArticleSettingsDocument>) { }
  async getSettings() {
    let settings = await this.model.findOne().exec();
    if (!settings) {
      settings = new this.model();
      await settings.save();
    }
    return settings;
  }
  async updateSettings(dto: any) {
    let settings = await this.model.findOne().exec();
    if (!settings) {
      settings = new this.model(dto);
      return settings.save();
    }
    Object.assign(settings, dto);
    return settings.save();
  }
}
