const express = require('express');
const router = express.Router();

const redis = require('redis');
const { promisify } = require('util');

const axios = require('axios');

// router.post('/subscribe', function(req, res, next) {
//   const { address, channels } = req.body;
//   const client = redis.createClient();
//   client.hgetall("subscribers", (error, result) => {
//     channels.forEach(channel => {
//       const channelSubs = new Set(JSON.parse(result[channel]));
//       channelSubs.add(address);
//       client.hmset("subscribers", channel, JSON.stringify(Array.from(channelSubs)), () => {});
//     });
//     client.hgetall("subscribers", (e, r) => {
//       res.send(JSON.stringify(r));
//     });
//   });
//   //client.quit();
// });

// subscribeAsync saves a subscriber's (i.e. microservice's) listening endpoint to the desired channels
// It receives an object with the subscriber's full endpoint URL and a list of channels.
router.post('/subscribeAsync', async function(req, res, next) {
  const { address, channels } = req.body;
  const client = redis.createClient();

  // Asynchronous versions of client functions
  const getAsync = promisify(client.hgetall).bind(client);
  const setAsync = promisify(client.hset).bind(client);

  const result = await getAsync("subscribers");
  for (let channel of channels) {
    // result is an object and result[channel] is a stringified list.
    // We parse the list and transform it into a Set to avoid duplicates
    const subscriberSet = new Set(JSON.parse(result[channel]));
    subscriberSet.add(address);
    // Set is converted to Array so as to be stringifiable.
    await setAsync("subscribers", channel, JSON.stringify(Array.from(subscriberSet)));
  }

  client.quit();

  if (result) {
    res.status(200).send({message: "OK"});
  }
  else {
    res.status(400).send({message: "An error occurred"});
  }

});

// publishAsync receives a message from a publisher and forwards it to all microservices subscribed to the given channel
router.post('/publishAsync', async function(req, res, next) {
  const { channel, message } = req.body;
  const client = redis.createClient();

  // Asynchronous versions of client functions
  const getAsync = promisify(client.hget).bind(client);
  const setAsync = promisify(client.hset).bind(client);

  const subscriberList = JSON.parse(await getAsync("subscribers", channel));

  // The message is forwarded to all subscribers
  // If a subscriber is down, the message is stored in a list for future reference.
  for (let sub of subscriberList) {
    axios.post(sub, message)
        .then(resp => {
          console.log(resp);
        })
        .catch(async e => {
          const messageList = JSON.parse(await getAsync("messages", channel));
          messageList.push(message);
          await setAsync("messages", channel, JSON.stringify(messageList));
          console.log(e);
        });
  }

  res.status(204).end();
});

module.exports = router;