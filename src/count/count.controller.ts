import { Controller, Get, Param, Res } from '@nestjs/common';
import dayjs from 'dayjs';
import { Response } from 'express';
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

    @Get('/:url/month')
    public async getCountsOnMonth(@Param('url') url: string) {
        const counts = await this.countService.findCountsOnMonth({
            url,
            year: dayjs().year(),
            month: dayjs().month() + 1,
        });
        return counts;
    }

    @Get('/:url/count')
    public async createNewCount(@Param('url') url: string) {
        await this.countService.createCount({
            url,
        });
    }

    @Get('/:url/image.svg')
    public async getSVGImage(@Param('url') url: string, @Res() res: Response) {
        await this.countService.createCount({
            url,
        });
        const counts = await this.countService.findAllCounts({
            url,
        });
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.send(
            `<svg viewBox="5 5 200 55" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <style type="text/css">
                        @import url(https//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.eot);
                    </style>
                    <linearGradient id="background" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#36afff;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#00d4ff;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect id="background" fill="url(#background)" x="10" y="10" width="100" height="45" style="filter: drop-shadow( 0 0 2px rgba(0, 0, 0, .7));" rx="10" ry="10"></rect>
                <text style="white-space: pre; fill: white; font-family: Nanum Gothic, sans-serif; font-size: 10px;" x="25" y="28">사이트 방문자수</text>
                <text style="white-space: pre; fill: white; font-family: Nanum Gothic, sans-serif; font-size: 8px;" x="25" y="40">${counts.length}</text>
                <text style="white-space: pre; fill: white; font-family: Nanum Gothic, sans-serif; font-size: 3px;" x="25" y="45">Pedometer by JinhyeokFang</text>
            </svg>
        `,
        );
    }
}
