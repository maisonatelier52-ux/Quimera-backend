import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthorsModule } from './authors/authors.module';
import { UploadsModule } from './uploads/uploads.module';
import { PublicModule } from './public/public.module';
import { PagesModule } from './pages/pages.module';
import { HomepageModule } from './homepage/homepage.module';
import { FooterModule } from './footer/footer.module';
import { SurveysModule } from './surveys/surveys.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ArticleSettingsModule } from './article-settings/article-settings.module';
import { HeaderModule } from './header/header.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://db-8:admin123@cluster0.ph0keki.mongodb.net/news-portal?retryWrites=true&w=majority&appName=Cluster0',
      { tlsAllowInvalidCertificates: true }
    ),
    AuthModule,
    ArticlesModule,
    CategoriesModule,
    AuthorsModule,
    UploadsModule,
    PublicModule,
    PagesModule,
    HomepageModule,
    FooterModule,
    SurveysModule,
    DashboardModule,
    ArticleSettingsModule,
    HeaderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
