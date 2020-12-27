import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CodeDocument = Code & Document;

@Schema()
export class Code {
  @ApiProperty({ minimum: 0, maximum: 75, required: true })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ minimum: 0, required: true })
  @Prop({ required: true })
  content: string;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
