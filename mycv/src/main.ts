import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// import cookieSession from 'cookie-session';
//호환성 문제가있어서 normal import 못함
const cookieSession = require('cookie-session');
// nest랑 cookie-session 호환성 문제가있어서 normal import 못함

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['anything'], // 암호화키
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
