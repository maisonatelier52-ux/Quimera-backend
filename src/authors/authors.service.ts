import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './author.schema';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author.name) private authorModel: Model<AuthorDocument>) {}

  async findAll() {
    return this.authorModel.find().exec();
  }

  async create(createAuthorDto: any) {
    const createdAuthor = new this.authorModel(createAuthorDto);
    return createdAuthor.save();
  }

  async findOne(id: string) {
    return this.authorModel.findById(id).exec();
  }

  async update(id: string, updateAuthorDto: any) {
    return this.authorModel.findByIdAndUpdate(id, updateAuthorDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.authorModel.findByIdAndDelete(id).exec();
  }
}
