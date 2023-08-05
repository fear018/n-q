const { createUser, getUserByEmail, getAllUsers } = require("../models/user");
const { createUserSchema, loginUserSchema } = require("./validation");

const { createHash, createJwtTokenAsync } = require("../services/auth");

exports.createUser = async (req, res) => {
  const { value, error } = createUserSchema.validate(req.body);

  if (error) {
    throw new Error(error);
  }

  const hash = createHash(value.password);

  const { id, name, email } = await createUser(value.name, value.email, hash);

  res.send({ id, name, email });
};

exports.loginUser = async (req, res) => {
  const { value, error } = loginUserSchema.validate(req.body);

  if (error) {
    throw new Error(error);
  }

  const user = await getUserByEmail(value.email);

  const hash = createHash(value.password);

  if (user.hash !== hash) {
    throw new Error("Invalid password");
  }

  const access = await createJwtTokenAsync({
    name: user.name,
    email: value.email,
  });

  res.send({ access: `Bearer ${access}` });
};

exports.getAllUsers = async (req, res) => {
  const users = await getAllUsers();

  res.send(users);
};
