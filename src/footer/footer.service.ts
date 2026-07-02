import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Footer, FooterDocument } from './footer.schema';

@Injectable()
export class FooterService {
  constructor(@InjectModel(Footer.name) private footerModel: Model<FooterDocument>) {}

  async getFooter() {
    let footer = await this.footerModel.findOne().exec();
    if (!footer) {
      footer = new this.footerModel();
      await footer.save();
    }
    return footer;
  }

  async updateFooter(updateFooterDto: any) {
    let footer = await this.footerModel.findOne().exec();
    if (!footer) {
      footer = new this.footerModel(updateFooterDto);
      return footer.save();
    }
    Object.assign(footer, updateFooterDto);
    return footer.save();
  }
}
