import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Count, CountDocument } from 'src/schemas/count.schema';
import CreateCountDTO from './dtos/create-count.dto';
import FindAllCountsDTO from './dtos/find-all-counts.dto';

@Injectable()
export class CountService {
    constructor(
        @InjectModel(Count.name) private countModel: Model<CountDocument>,
    ) {}

    public async createCount(createCountDTO: CreateCountDTO) {
        const { url } = createCountDTO;
        const count = new this.countModel({
            url,
        });
        return count.save();
    }

    public async findAllCounts(findAllCountsDTO: FindAllCountsDTO) {
        const { url } = findAllCountsDTO;
        const counts = await this.countModel.find({
            url,
        });
        return counts;
    }
}
