import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Count, CountDocument } from 'src/schemas/count.schema';
import CreateCountDTO from './dtos/create-count.dto';
import FindAllCountsDTO from './dtos/find-all-counts.dto';
import FindCountsOnMonthDTO from './dtos/find-counts-on-month.dto';

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

    public async findCountsOnMonth(findCountsOnMonthDTO: FindCountsOnMonthDTO) {
        const { url, month, year } = findCountsOnMonthDTO;
        const nextMonth = dayjs()
            .set('year', year)
            .set('month', month)
            .set('date', 1)
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
            .add(1, 'month');
        const counts = await this.countModel.find({
            createdAt: {
                $gte: new Date(year, month, 1),
                $lt: new Date(nextMonth.year(), nextMonth.month(), 1),
            },
            url,
        });

        return counts;
    }
}
