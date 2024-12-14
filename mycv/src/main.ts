import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import cookieSession from 'cookie-session';
//호환성 문제가있어서 normal import 못함
// nest랑 cookie-session 호환성 문제가있어서 normal import 못함

import { setupApp } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
