import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("server on port", "http://localhost:3000")
  console.log("prueba")
  await app.listen(3000);
}
bootstrap();
