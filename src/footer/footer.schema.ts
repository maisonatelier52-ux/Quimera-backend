import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FooterDocument = Footer & Document;

@Schema({ _id: false })
class FooterLink {
  @Prop({ required: true })
  title: string;

  @Prop()
  slug: string;

  @Prop()
  externalUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'Page' })
  pageId: Types.ObjectId;

  @Prop()
  pageTitle: string;

  @Prop({ default: 0 })
  order: number;
}

@Schema({ _id: false })
class SocialLinks {
  @Prop()
  instagram: string;

  @Prop()
  facebook: string;

  @Prop()
  twitter: string;

  @Prop()
  linkedin: string;

  @Prop()
  reddit: string;

  @Prop()
  telegram: string;

  @Prop()
  medium: string;

  @Prop()
  substack: string;
}

@Schema({ timestamps: true })
export class Footer {
  @Prop({ default: "Independent coverage of London politics, business, culture, lifestyle, technology and sport." })
  siteDescription: string;

  @Prop({ default: '#09365E' })
  footerBgColor: string;

  @Prop({ default: "Newsroom" })
  column1Title: string;

  @Prop({ type: [FooterLink], default: [] })
  column1Links: FooterLink[];

  @Prop({ default: "Standards" })
  column2Title: string;

  @Prop({ type: [FooterLink], default: [] })
  column2Links: FooterLink[];

  @Prop({ default: "Legal" })
  column3Title: string;

  @Prop({ type: [FooterLink], default: [] })
  column3Links: FooterLink[];

  @Prop({ default: "Get Involved" })
  column4Title: string;

  @Prop({ type: [FooterLink], default: [] })
  column4Links: FooterLink[];

  @Prop({ type: SocialLinks, default: {} })
  socialLinks: SocialLinks;

  @Prop({ default: "© 2026 London News. All Rights Reserved." })
  copyrightText: string;

  @Prop()
  backgroundImage: string;

  @Prop({ default: "Stay Ahead of London" })
  newsletterTitle: string;

  @Prop({ default: "Get the latest London news delivered directly to your inbox." })
  newsletterDescription: string;

  @Prop({ default: "Subscribe" })
  newsletterButtonText: string;

  @Prop({ default: "Successfully subscribed! Check your inbox." })
  newsletterSuccessText: string;
}

export const FooterSchema = SchemaFactory.createForClass(Footer);
