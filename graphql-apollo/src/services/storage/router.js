const Router = require("koa-router");

const router = new Router();

const { createUser, getUserByEmail, getAllUsers } = require("./models/user");

router.post("/user", async (ctx) => {
  const { name, email, hash } = ctx.request.body;
  ctx.body = await createUser(name, email, hash);
});

router.post("/userByEmail", async (ctx) => {
  const { email } = ctx.request.body;
  ctx.body = await getUserByEmail(email);
});

router.get("/users", async (ctx) => {
  ctx.body = await getAllUsers();
});

module.exports = router;
