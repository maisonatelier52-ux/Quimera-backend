import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../public/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async findAll() {
    return this.commentModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: string) {
    const comment = await this.commentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).exec();
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async remove(id: string) {
    const comment = await this.commentModel.findByIdAndDelete(id).exec();
    if (!comment) throw new NotFoundException('Comment not found');
    return { success: true };
  }
}
