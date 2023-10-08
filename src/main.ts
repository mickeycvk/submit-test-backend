import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
  });
  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('app.port');
  const appHost = configService.get<string>('app.host');
  const configSwagger = new DocumentBuilder()
    .setTitle('Robinhood Interview APIs')
    .setDescription(
      'This is APIs service that provides interview data and comment data',
    )
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);
  await app.listen(appPort, appHost);
}
bootstrap();
