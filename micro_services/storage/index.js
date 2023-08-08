const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

const router = require("./router");

app.use(bodyParser());

const PORT = parseInt(process.env.PORT) || 4000;

app.use(router.routes());

app.listen(PORT, () => {
  console.log(`🚀 PRISMA PORT: ${PORT}`);
});
