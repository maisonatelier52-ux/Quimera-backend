import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Homepage, HomepageDocument } from './homepage.schema';

@Injectable()
export class HomepageService {
  constructor(@InjectModel(Homepage.name) private homepageModel: Model<HomepageDocument>) {}

  async findAll() {
    return this.homepageModel.find().exec();
  }

  async findOne(id: string) {
    return this.homepageModel.findById(id).exec();
  }

  async create(createHomepageDto: any) {
    const createdHomepage = new this.homepageModel(createHomepageDto);
    return createdHomepage.save();
  }

  async update(id: string, updateHomepageDto: any) {
    return this.homepageModel.findByIdAndUpdate(id, updateHomepageDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.homepageModel.findByIdAndDelete(id).exec();
  }
}
