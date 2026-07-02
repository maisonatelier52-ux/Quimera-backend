import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ArticleSettingsDocument = ArticleSettings & Document;
@Schema({ timestamps: true })
export class ArticleSettings {
  @Prop({ type: [String], default: ['ArticleHeader', 'ArticleContent', 'RelatedArticles', 'Comments'] })
  articleLayout: string[];
}
export const ArticleSettingsSchema = SchemaFactory.createForClass(ArticleSettings);
