import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MoodSurveyDocument = MoodSurvey & Document;

@Schema({ _id: false })
class MoodOption {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  label: string;

  @Prop({ default: 0 })
  votes: number;
}

@Schema({ timestamps: true })
export class MoodSurvey {
  @Prop({ required: true, unique: true })
  date: string; // YYYY-MM-DD

  @Prop({ default: "London is okay right now" })
  headline: string;

  @Prop({ default: "Updated recently" })
  updatedText: string;

  @Prop({ default: "London's Mood Right Now" })
  surveyTitle: string;

  @Prop({ default: "Take Part in Our Daily Survey" })
  surveyButtonLabel: string;

  @Prop({ default: "Thanks for sharing your mood!" })
  surveySuccessText: string;

  @Prop({
    type: [MoodOption],
    default: [
      { key: "happy", label: "Happy", votes: 0 },
      { key: "sad", label: "Sad", votes: 0 },
      { key: "okay", label: "Can't complain", votes: 0 },
    ],
  })
  options: MoodOption[];

  @Prop({ default: true })
  isActive: boolean;
}

export const MoodSurveySchema = SchemaFactory.createForClass(MoodSurvey);
