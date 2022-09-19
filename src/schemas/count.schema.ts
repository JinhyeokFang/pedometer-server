import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type CountDocument = Count & Document;

@Schema({ timestamps: true })
export class Count {
    @Prop({ required: true })
    url: string;

    @Prop({ type: Date, required: true, default: Date.now })
    createdAt: Date;
}

export const CountSchema = SchemaFactory.createForClass(Count);
