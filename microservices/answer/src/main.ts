import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const axios = require('axios').default;

async function subscribeToChannels(): Promise<boolean> {
  const respUser = await axios.post("http://localhost:4000/subscribeAsync", {
    address: "http://localhost:3004/sync/getUserEvent",
    channels: ["users"]
  });

  const respQuestion = await axios.post("http://localhost:4000/subscribeAsync", {
    address: "http://localhost:3004/sync/getQuestionEvent",
    channels: ["questions"]
  });

  return respUser.status === 200 && respQuestion.status === 200;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3004);

  await subscribeToChannels();
}
bootstrap();
