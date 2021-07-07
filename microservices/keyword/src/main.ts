import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const axios = require('axios').default;

// The keyword microservice subscribes to users and questions channels, because it must get informed
// for changes in User and Question entities.
async function subscribeToChannels(): Promise<boolean> {
  const respUser = await axios.post("http://localhost:4000/subscribeAsync", {
    address: "http://localhost:3005/sync/getUserEvent",
    channels: ["users"]
  });

  const respQuestion = await axios.post("http://localhost:4000/subscribeAsync", {
    address: "http://localhost:3005/sync/getQuestionEvent",
    channels: ["questions"]
  });

  return respUser.status === 200 && respQuestion.status === 200;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3005);

  await subscribeToChannels();
}
bootstrap();
