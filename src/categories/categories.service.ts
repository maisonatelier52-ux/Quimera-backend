import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  async create(createCategoryDto: any) {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async update(id: string, updateCategoryDto: any) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
