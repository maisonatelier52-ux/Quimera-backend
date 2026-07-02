import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema({ timestamps: true })
export class Author {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ default: '' })
  role: string;

  @Prop({ default: '' })
  email: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
