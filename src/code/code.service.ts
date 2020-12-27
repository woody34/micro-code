import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Code, CodeDocument } from './code.schema';

@Injectable()
export class CodeService {
  constructor(@InjectModel(Code.name) private model: Model<CodeDocument>) {}

  async findById(_id: string): Promise<Code> {
    try {
      return this.model.findOne({ _id }).exec();
    } catch (e) {
      throw new Error(e.message || `Error getting doc '${_id}'`);
    }
  }

  async upsert(code: CodeDocument): Promise<Code> {
    try {
      const model = new this.model(code);

      const options: QueryOptions = { upsert: true };

      if (code._id) {
        await model.updateOne(code, options);
      } else {
        await model.save();
      }

      return model;
    } catch (e) {
      throw new Error(e.message || `Error saving code`);
    }
  }

  async query(options: FilterQuery<Code> = {}): Promise<Code[]> {
    try {
      const podcast = await this.model.find(options);
      return podcast;
    } catch (e) {
      // throw new InternalServerError(e.message || `Error querying for podcast`);
    }
  }

  async delete(_id: string) {
    try {
      const filter: FilterQuery<Code> = { _id };
      await this.model.deleteOne(filter).exec();
    } catch (e) {
      throw new Error(e.message || `Error deleting podcast '${_id}'`);
    }
  }
}
