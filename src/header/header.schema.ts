import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HeaderDocument = Header & Document;

@Schema({ timestamps: true })
export class Header {
  @Prop({ default: 'text' })
  logoType: string; // 'text' | 'image'

  @Prop({ default: '#09365E' })
  topBarBgColor: string;

  @Prop({ default: '#000000' })
  navbarBgColor: string;

  @Prop({ default: '#09365E' })
  tickerBgColor: string;

  @Prop({ default: 'QUIMERA' })
  logoText: string;

  @Prop({ default: '' })
  logoImageUrl: string;

  @Prop({ type: [String], default: ['date', 'logo', 'search'] })
  layoutOrder: string[];

  @Prop({ type: [String], default: ['topBar', 'navbar', 'ticker'] })
  verticalOrder: string[];
}

export const HeaderSchema = SchemaFactory.createForClass(Header);
