import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
import { Category, CategoryDocument } from '../categories/category.schema';
import { Author, AuthorDocument } from '../authors/author.schema';
import { Page, PageDocument } from '../pages/page.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    @InjectModel(Page.name) private pageModel: Model<PageDocument>
  ) {}

  async getStats() {
    const [
      totalArticles,
      totalCategories,
      totalAuthors,
      totalPages,
      recentArticles,
      viewStats
    ] = await Promise.all([
      this.articleModel.countDocuments(),
      this.categoryModel.countDocuments(),
      this.authorModel.countDocuments(),
      this.pageModel.countDocuments(),
      this.articleModel.find().sort({ date: -1 }).limit(5).populate('category', 'name').exec(),
      this.articleModel.aggregate([
        { $group: { _id: null, totalViews: { $sum: "$views" } } }
      ])
    ]);

    const totalViews = viewStats.length > 0 ? viewStats[0].totalViews : 0;

    return {
      metrics: {
        totalArticles,
        totalCategories,
        totalAuthors,
        totalPages,
        totalViews
      },
      recentActivity: recentArticles
    };
  }
}
