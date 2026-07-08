import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: '' })
  bannerImage: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 99 })
  position: number;

  @Prop({ default: true })
  isVisible: boolean;

  @Prop({ default: '' })
  seoTitle: string;

  @Prop({ default: '' })
  seoDescription: string;

  @Prop({ default: '' })
  keywords: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
