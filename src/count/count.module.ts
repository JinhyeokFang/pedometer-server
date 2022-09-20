import { Module } from '@nestjs/common';
import { CountService } from './count.service';
import { CountController } from './count.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Count, CountSchema } from 'src/schemas/count.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Count.name,
                schema: CountSchema,
            },
        ]),
    ],
    providers: [CountService],
    controllers: [CountController],
})
export class CountModule {}
