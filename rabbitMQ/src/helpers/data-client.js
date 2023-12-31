const axios = require("axios");

exports.createUser = async (name, email, hash) => {
  const { data } = await axios.post(`${process.env.PRISMA_ENDPOINT}/user`, {
    name,
    email,
    hash,
  });

  return data;
};

exports.getUserByEmail = async (email) => {
  const { data } = await axios.post(
    `${process.env.PRISMA_ENDPOINT}/userByEmail`,
    {
      email,
    }
  );

  return data;
};

exports.getAllUsers = async () => {
  const { data } = await axios.get(`${process.env.PRISMA_ENDPOINT}/users`);

  return data;
};
