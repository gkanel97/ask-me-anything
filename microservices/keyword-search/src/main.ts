import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const axios = require('axios').default;

// The keyword-search microservice subscribes to keywords channel, because it must get informed
// for changes in Keyword entities.
async function subscribeToChannels(): Promise<boolean> {
  const respKeyword = await axios.post("http://localhost:4000/subscribeAsync", {
    address: "http://localhost:3006/sync/getKeywordEvent",
    channels: ["keywords"]
  });

  return respKeyword.status === 200;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3006);

  await subscribeToChannels();
}
bootstrap();
