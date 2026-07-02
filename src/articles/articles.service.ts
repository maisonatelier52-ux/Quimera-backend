import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async findAll() {
    return this.articleModel.find().populate('category', 'name').exec();
  }

  async findOne(id: string) {
    return this.articleModel.findById(id).exec();
  }

  async create(createArticleDto: any) {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async update(id: string, updateArticleDto: any) {
    return this.articleModel.findByIdAndUpdate(id, updateArticleDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.articleModel.findByIdAndDelete(id).exec();
  }
}
