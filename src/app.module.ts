import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { CountModule } from './count/count.module';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(
            'mongodb+srv://jinhyeokfang:1q2w3e4r!@pedometer-mongodb.orpfpb9.mongodb.net/?retryWrites=true&w=majority',
        ),
        CountModule,
    ],
})
export class AppModule {}
