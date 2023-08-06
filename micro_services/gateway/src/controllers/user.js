const {
  createUser,
  getUserByEmail,
  getAllUsers,
} = require("../services/data-client");

const { createHash, createJwtTokenAsync } = require("../services/auth");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = createHash(password);

  const user = await createUser(name, email, hash);

  res.send(user);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  const hash = createHash(password);

  if (user.hash !== hash) {
    throw new Error("GATEWAY Invalid password");
  }

  const access = await createJwtTokenAsync({
    name: user.name,
    email,
  });

  res.send({ access: `Bearer ${access}` });
};

exports.getAllUsers = async (req, res) => {
  const users = await getAllUsers();

  res.send(users);
};
