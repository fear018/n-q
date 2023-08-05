const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
// const cors = require("@koa/cors");

const app = new Koa();

const router = require("./router");

app.use(bodyParser());
// app.use(cors());

const PORT = parseInt(process.env.PORT) || 4000;

app.use(router.routes());

app.listen(PORT, () => {
  console.log(`🚀 PRISMA PORT: ${PORT}`);
});
