import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CountModule } from './count/count.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb+srv://jinhyeokfang:1q2w3e4r!@pedometer-mongodb.orpfpb9.mongodb.net/?retryWrites=true&w=majority'),
    CountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
