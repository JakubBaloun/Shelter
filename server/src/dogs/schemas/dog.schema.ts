import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DogDocument = HydratedDocument<Dog>;

@Schema({ timestamps: true })
export class Dog {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  adoptable: boolean;

  @Prop({
    type: [
      {
        date: { type: Date, required: true },
        previousStatus: { type: Boolean, required: true },
        newStatus: { type: Boolean, required: true },
      },
    ],
    default: [],
  })
  statusHistory: {
    date: Date;
    previousStatus: boolean;
    newStatus: boolean;
  }[];
}

export const DogSchema = SchemaFactory.createForClass(Dog);
