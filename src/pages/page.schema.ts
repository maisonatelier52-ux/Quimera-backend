import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PageDocument = Page & Document;

@Schema()
class PageBlock {
  @Prop({ required: true })
  type: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  data: any;

  @Prop({ default: 0 })
  order: number;
}

@Schema()
class Job {
  @Prop({ default: '' })
  title: string;

  @Prop({ default: '' })
  location: string;

  @Prop({ default: 'Full-time' })
  type: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: true })
  isActive: boolean;
}

@Schema()
class NavLink {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  label: string;

  @Prop({ default: 0 })
  order: number;
}

@Schema()
class ContactType {
  @Prop({ default: '📰' })
  icon: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  order: number;
}

@Schema({ timestamps: true })
export class Page {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ default: 'custom' })
  template: string;

  @Prop({ default: '' })
  seoTitle: string;

  @Prop({ default: '' })
  seoDescription: string;

  @Prop({ default: '' })
  keywords: string;

  @Prop({ default: '' })
  ogImage: string;

  @Prop({ default: '' })
  heroImage: string;

  @Prop({ default: '' })
  heroImageAlt: string;

  @Prop({ default: '' })
  heroTitle: string;

  @Prop({ default: '' })
  heroSubtitle: string;

  @Prop({ default: '' })
  missionStatement: string;

  @Prop({ default: '' })
  foundingDate: string;

  @Prop({ default: '' })
  contactEmail: string;

  @Prop({ default: '' })
  contactPhone: string;

  @Prop({ default: '' })
  contactAddress: string;

  @Prop({ default: true })
  contactFormEnabled: boolean;

  @Prop({ default: "Send Us a Message" })
  contactFormTitle: string;

  @Prop({ default: "" })
  contactFormDescription: string;

  @Prop({ default: "Have a story tip, press inquiry, correction, or general question? We'd love to hear from you." })
  contactIntroTitle: string;

  @Prop({ default: "Our newsroom is based in London and our journalists are working around the clock to bring you the news that matters across the capital." })
  contactIntroText: string;

  @Prop({ default: "Our Office" })
  contactOfficeTitle: string;

  @Prop({ default: "London News\n1 London Bridge Street\nLondon, SE1 9GF\nUnited Kingdom" })
  contactOfficeAddress: string;

  @Prop({ default: "General Inquiries" })
  contactEmailTitle: string;

  @Prop({ default: "Phone" })
  contactPhoneTitle: string;

  @Prop({ default: "Newsroom Hours" })
  contactHoursTitle: string;

  @Prop({ default: "24/7 — Our newsroom never sleeps.\nTips and messages are monitored around the clock." })
  contactHoursText: string;

  @Prop({ default: "What You Can Contact Us About" })
  contactTypesTitle: string;

  @Prop({ type: [ContactType], default: [] })
  contactTypes: ContactType[];

  @Prop({ default: "Stay Ahead of London" })
  newsletterTitle: string;

  @Prop({ default: "Get the latest news, analysis, and stories delivered straight to your inbox." })
  newsletterDescription: string;

  @Prop({ default: "Subscribe" })
  newsletterButtonText: string;

  @Prop({ default: "Successfully subscribed! Check your inbox." })
  newsletterSuccessText: string;

  @Prop({ type: [Job], default: [] })
  jobsList: Job[];

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  policyContent: any;

  @Prop({ type: [NavLink], default: [] })
  navLinks: NavLink[];

  @Prop({ default: Date.now })
  lastUpdated: Date;

  @Prop({ type: [PageBlock], default: [] })
  blocks: PageBlock[];

  @Prop({ default: true })
  isPublished: boolean;

  @Prop({ default: Date.now })
  publishedAt: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);

PageSchema.pre('validate', function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});
