import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppearanceDocument = Appearance & Document;

@Schema({ timestamps: true })
export class Appearance {
  @Prop({ default: '#09365E' })
  headerBgColor: string;

  @Prop({ default: '#09365E' })
  footerBgColor: string;

  @Prop({ default: '#E12A32' })
  primaryAccentColor: string;

  @Prop({ default: '#333333' })
  globalTextColor: string;

  @Prop({ default: 'sans-serif' })
  globalFontFamily: string;

  @Prop({ type: [String], default: ['HomeHero', 'JustIn', 'FeaturedStories', 'NewsStrip', 'QuickLinks', 'BusinessSection', 'AdvertisementSection', 'WhatToRead', 'TheLatest', 'CategoryAd', 'MoreNews'] })
  homeLayout: string[];

  @Prop({ type: [String], default: ['ArticleHeader', 'ArticleContent', 'RelatedArticles', 'Comments'] })
  articleLayout: string[];
}

export const AppearanceSchema = SchemaFactory.createForClass(Appearance);
