const { createClient } = require("redis");

const client = createClient({
  url: "redis://redis:6379",
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
