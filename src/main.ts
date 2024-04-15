import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // TODO == input validation after finalizing 
  // TODO == Error handling == https://nestjs-prisma.dev/docs/basic-usage/
  // TODO == Hashing passowrds
  const config = new DocumentBuilder()

  .setTitle('Mindioo')
  .setDescription('Mindioo APIs')
  .setVersion('0.1')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
