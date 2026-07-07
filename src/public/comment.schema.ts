import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true, index: true })
  articleSlug: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: Types.ObjectId, ref: 'Comment', default: null })
  parentId: Types.ObjectId;

  @Prop({ default: 'pending', enum: ['pending', 'approved'] })
  status: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);