import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './page.schema';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) {}

  async findAll() {
    return this.pageModel.find().exec();
  }

  async findOne(id: string) {
    return this.pageModel.findById(id).exec();
  }

  async create(createPageDto: any) {
    const createdPage = new this.pageModel(createPageDto);
    return createdPage.save();
  }

  async update(id: string, updatePageDto: any) {
    return this.pageModel.findByIdAndUpdate(id, updatePageDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.pageModel.findByIdAndDelete(id).exec();
  }
}
