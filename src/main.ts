import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { LoggingInterceptor } from './shared/interceptors/logging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ["*","http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
  })

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }))
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
