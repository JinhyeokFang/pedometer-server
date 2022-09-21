import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import helmet from 'helmet';
import { AppModule } from './app.module';

let server: Handler;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(helmet());
    const configService: ConfigService = app.get(ConfigService);

    const config = new DocumentBuilder()
        .setTitle('Pedometer Server')
        .setDescription('The Pedometer Server API Document')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({
        app: expressApp,
        binaryMimeTypes: ['image/svg+xml', 'application/json'],
    });
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
};
