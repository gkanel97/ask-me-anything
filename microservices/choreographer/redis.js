const redis = require('redis');
const { promisify } = require('util');

async function init() {

    // Generate a new redis client to create pub-sub channels
    const client = redis.createClient();
    const setAsync = promisify(client.hmset).bind(client);
    const emptyList = JSON.stringify([]);
    await setAsync("subscribers", "users", emptyList, "questions", emptyList, "answers", emptyList);
    await setAsync("messages", "users", emptyList, "questions", emptyList, "answers", emptyList);

    // Close the client in an elegant way
    client.quit();
}

module.exports = {
    init
}