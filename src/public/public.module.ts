import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { Article, ArticleSchema } from '../articles/article.schema';
import { Category, CategorySchema } from '../categories/category.schema';
import { Page, PageSchema } from '../pages/page.schema';
import { Homepage, HomepageSchema } from '../homepage/homepage.schema';
import { Footer, FooterSchema } from '../footer/footer.schema';
import { MoodSurvey, MoodSurveySchema } from '../surveys/mood-survey.schema';
import { Author, AuthorSchema } from '../authors/author.schema';
import { ArticleSettings, ArticleSettingsSchema } from '../article-settings/article-settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Page.name, schema: PageSchema },
      { name: Homepage.name, schema: HomepageSchema },
      { name: Footer.name, schema: FooterSchema },
      { name: MoodSurvey.name, schema: MoodSurveySchema },
      { name: Author.name, schema: AuthorSchema },
      { name: ArticleSettings.name, schema: ArticleSettingsSchema },
    ]),
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
