import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type HomepageDocument = Homepage & Document;

@Schema({ _id: false })
class HomepageSlot {
  @Prop({ type: Types.ObjectId, ref: 'Article', default: null })
  articleId: Types.ObjectId;

  @Prop({ default: '' })
  titleOverride: string;

  @Prop({ default: '' })
  excerptOverride: string;

  @Prop({ default: '' })
  imageOverride: string;

  @Prop({ default: '' })
  kickerOverride: string;
}

@Schema({ _id: false })
class HomepageSection {
  @Prop({ required: true })
  key: string;

  @Prop({ enum: ['featured', 'headline', 'overlay', 'list', 'overlay_tall'], default: 'overlay' })
  type: string;

  @Prop({ default: '' })
  title: string;

  @Prop({ default: 3 })
  limit: number;

  @Prop({ default: 0 })
  order: number;

  @Prop({ type: [HomepageSlot], default: [] })
  slots: HomepageSlot[];
}

@Schema({ timestamps: true })
export class Homepage {
  @Prop({ default: '' })
  title: string;

  @Prop({ default: '#E12A32' })
  primaryAccentColor: string;

  @Prop({ type: [String], default: ['HomeHero', 'JustIn', 'FeaturedStories', 'NewsStrip', 'QuickLinks', 'BusinessSection', 'AdvertisementSection', 'WhatToRead', 'TheLatest', 'CategoryAd', 'MoreNews'] })
  homeLayout: string[];

  @Prop({ default: '' })
  slug: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: '' })
  seoTitle: string;

  @Prop({ default: '' })
  seoDescription: string;

  @Prop({ type: [HomepageSection], default: [] })
  sections: HomepageSection[];
}

export const HomepageSchema = SchemaFactory.createForClass(Homepage);
