const {
  createUser,
  getUserByEmail,
  getAllUsers,
} = require("../helpers/data-client");

const { createHash, createJwtTokenAsync } = require("../helpers/auth");

exports.createUser = async (_, args, ctx) => {
  const { name, email, password } = args;
  const hash = createHash(password);

  const user = await createUser(name, email, hash);

  return user;
};

exports.loginUser = async (_, args, ctx) => {
  const { email, password } = args;

  const user = await getUserByEmail(email);

  const hash = createHash(password);

  if (user.hash !== hash) {
    throw new Error("GATEWAY Invalid password");
  }

  const access = await createJwtTokenAsync({
    name: user.name,
    email,
  });

  return { access: `Bearer ${access}` };
};

exports.getAllUsers = async () => {
  const users = await getAllUsers();

  return users;
};
