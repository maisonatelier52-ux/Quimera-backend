import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Article, ArticleSchema } from '../articles/article.schema';
import { Category, CategorySchema } from '../categories/category.schema';
import { Author, AuthorSchema } from '../authors/author.schema';
import { Page, PageSchema } from '../pages/page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Page.name, schema: PageSchema }
    ])
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
