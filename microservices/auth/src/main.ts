import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
      AppModule,
      { transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 4000
        }
      }
  );

  await app.listen(() => console.log('Auth microservice is listening on port 4000'));
}

bootstrap();