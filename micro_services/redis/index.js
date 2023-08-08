const { createClient } = require("redis");

const client = createClient({
  url: "redis://cache_server:6379",
});

client.on("error", (error) => {
  console.error("REDIS client error", error);
});

module.exports = async () => {
  if (!client.isReady) {
    await client.connect();
  }

  return client;
};
