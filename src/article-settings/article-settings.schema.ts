import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ArticleSettingsDocument = ArticleSettings & Document;
@Schema({ timestamps: true })
export class ArticleSettings {
  @Prop({ type: String, default: '#09365E' })
  headerColor: string;

  @Prop({ type: String, default: '#374151' })
  paragraphColor: string;

  @Prop({ type: String, default: '#000000' })
  textColor: string;

  @Prop({ type: String, default: 'serif' })
  fontFamily: string;

  @Prop({ type: String, default: 'right' })
  sidebarPosition: string;
}
export const ArticleSettingsSchema = SchemaFactory.createForClass(ArticleSettings);
