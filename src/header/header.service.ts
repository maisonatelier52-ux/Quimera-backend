import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Header, HeaderDocument } from './header.schema';

@Injectable()
export class HeaderService {
  constructor(@InjectModel(Header.name) private headerModel: Model<HeaderDocument>) {}

  async getHeader() {
    let header = await this.headerModel.findOne().exec();
    if (!header) {
      header = new this.headerModel();
      await header.save();
    }
    return header;
  }

  async updateHeader(updateHeaderDto: any) {
    let header = await this.headerModel.findOne().exec();
    if (!header) {
      header = new this.headerModel(updateHeaderDto);
      return header.save();
    }
    Object.assign(header, updateHeaderDto);
    return header.save();
  }
}
