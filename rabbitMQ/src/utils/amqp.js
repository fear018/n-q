const amqplib = require("amqplib/callback_api");
const { Buffer } = require("buffer");

module.exports = async () => {
  const queue = "tasks";

  amqplib.connect("amqp://message_broker", (err, conn) => {
    if (err) throw err;

    // Listener
    conn.createChannel((err, ch2) => {
      if (err) throw err;

      ch2.assertQueue(queue);

      ch2.consume(queue, (msg) => {
        if (msg !== null) {
          console.log(msg.content.toString());
          ch2.ack(msg);
        } else {
          console.log("Consumer cancelled by server");
        }
      });
    });

    // Sender
    conn.createChannel((err, ch1) => {
      if (err) throw err;

      ch1.assertQueue(queue);

      setInterval(() => {
        ch1.sendToQueue(
          queue,
          Buffer.from(`Hello from RabbitMQ! => ${Date.now()}}`)
        );
      }, 1000);
    });
  });
};
