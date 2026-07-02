import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appearance, AppearanceDocument } from './appearance.schema';

@Injectable()
export class AppearanceService {
  constructor(
    @InjectModel(Appearance.name) private appearanceModel: Model<AppearanceDocument>
  ) {}

  async getAppearance() {
    let settings = await this.appearanceModel.findOne();
    if (!settings) {
      settings = await this.appearanceModel.create({});
    }
    return settings;
  }

  async updateAppearance(updateDto: any) {
    let settings = await this.appearanceModel.findOne();
    if (!settings) {
      settings = await this.appearanceModel.create(updateDto);
      return settings;
    }
    return this.appearanceModel.findByIdAndUpdate(settings._id, updateDto, { new: true });
  }
}
