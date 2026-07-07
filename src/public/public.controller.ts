import { Controller, Get, Post, Param, NotFoundException, Body, Query } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('api/public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('articles')
  async getArticles(@Query('category') categorySlug?: string) {
    return this.publicService.getPublishedArticles(categorySlug);
  }

  @Get('articles/:slug')
  async getArticle(@Param('slug') slug: string) {
    const article = await this.publicService.getArticleBySlug(slug);
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  @Get('categories')
  async getCategories() {
    return this.publicService.getCategories();
  }

  @Get('pages/:slug')
  async getPage(@Param('slug') slug: string) {
    const page = await this.publicService.getPageBySlug(slug);
    if (!page) throw new NotFoundException('Page not found');
    return page;
  }

  @Get('homepage')
  async getHomepage() {
    const hp = await this.publicService.getActiveHomepage();
    if (!hp) throw new NotFoundException('Active homepage not found');
    return hp;
  }

  @Get('footer')
  async getFooter() {
    return this.publicService.getFooter();
  }

  @Get('surveys/active')
  async getActiveSurvey() {
    const survey = await this.publicService.getActiveSurvey();
    if (!survey) throw new NotFoundException('No active survey found');
    return survey;
  }

  @Post('surveys/:id/vote')
  async voteSurvey(@Param('id') id: string, @Body('option') optionKey: string) {
    await this.publicService.voteSurvey(id, optionKey);
    return { success: true };
  }

  @Get('authors')
  async getAuthors() {
    return this.publicService.getAuthors();
  }

  @Get('article-settings')
  async getArticleSettings() {
    return this.publicService.getArticleSettings();
  }

  @Get('articles/:slug/comments')
  async getComments(@Param('slug') slug: string) {
    return this.publicService.getCommentsBySlug(slug);
  }

  @Post('articles/:slug/comments')
  async addComment(@Param('slug') slug: string, @Body() body: any) {
    return this.publicService.addComment(slug, body);
  }

  @Post('subscribe')
  async subscribe(@Body() body: { name: string; email: string }) {
    return this.publicService.subscribe(body.name, body.email);
  }
}
