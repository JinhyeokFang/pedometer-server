import { Controller, Get, Param } from '@nestjs/common';
import { CountService } from './count.service';

@Controller('count')
export class CountController {
    constructor(private countService: CountService) {}

    @Get('/:url/all')
    public async getAllCounts(@Param('url') url: string) {
        const counts = await this.countService.findAllCounts({
            url,
        });
        return counts;
    }

    @Get('/:url/count')
    public async createNewCount(@Param('url') url: string) {
        await this.countService.createCount({
            url,
        });
    }
}
