import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
import { Category, CategoryDocument } from '../categories/category.schema';
import { Page, PageDocument } from '../pages/page.schema';
import { Homepage, HomepageDocument } from '../homepage/homepage.schema';
import { Footer, FooterDocument } from '../footer/footer.schema';
import { MoodSurvey, MoodSurveyDocument } from '../surveys/mood-survey.schema';
import { Author, AuthorDocument } from '../authors/author.schema';
import { ArticleSettings, ArticleSettingsDocument } from '../article-settings/article-settings.schema';

@Injectable()
export class PublicService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Page.name) private pageModel: Model<PageDocument>,
    @InjectModel(Homepage.name) private homepageModel: Model<HomepageDocument>,
    @InjectModel(Footer.name) private footerModel: Model<FooterDocument>,
    @InjectModel(MoodSurvey.name) private surveyModel: Model<MoodSurveyDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    @InjectModel(ArticleSettings.name) private articleSettingsModel: Model<ArticleSettingsDocument>,
  ) {}

  async getPublishedArticles(categorySlug?: string) {
    let query: any = { isPublished: true };
    
    if (categorySlug) {
      const category = await this.categoryModel.findOne({ slug: categorySlug }).exec();
      if (category) {
        query.category = { $in: [category._id, category._id.toString()] };
      } else {
        return []; // If category slug doesn't match any category, return empty
      }
    }

    return this.articleModel
      .find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getArticleBySlug(slug: string) {
    return this.articleModel
      .findOne({ slug, isPublished: true })
      .populate('category', 'name slug')
      .exec();
  }

  async getCategories() {
    return this.categoryModel.find().sort({ name: 1 }).exec();
  }

  async getPageBySlug(slug: string) {
    return this.pageModel.findOne({ slug, isPublished: true }).exec();
  }

  async getActiveHomepage() {
    return this.homepageModel.findOne({ isActive: true }).exec();
  }

  async getFooter() {
    return this.footerModel.findOne().exec();
  }

  async getActiveSurvey() {
    return this.surveyModel.findOne({ isActive: true }).sort({ date: -1 }).exec();
  }

  async voteSurvey(surveyId: string, optionKey: string) {
    return this.surveyModel.updateOne(
      { _id: surveyId, 'options.key': optionKey },
      { $inc: { 'options.$.votes': 1 } }
    ).exec();
  }

  async getAuthors() {
    return this.authorModel.find().sort({ name: 1 }).exec();
  }

  async getArticleSettings() {
    let settings = await this.articleSettingsModel.findOne().exec();
    if (!settings) {
      settings = await this.articleSettingsModel.create({});
    }
    return settings;
  }
}
