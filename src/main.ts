import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Code Api')
    .setDescription('The Api for Software Blocks Code')
    .setVersion('1.0')
    .addTag('code')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs/', app, document);

  await app.listen(port);
}
bootstrap();
