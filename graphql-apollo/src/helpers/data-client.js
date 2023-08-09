const axios = require("axios");

exports.createUser = async (name, email, hash) => {
  const { data } = await axios.post(`${process.env.STORAGE_URL}/user`, {
    name,
    email,
    hash,
  });

  return data;
};

exports.getUserByEmail = async (email) => {
  const { data } = await axios.post(`${process.env.STORAGE_URL}/userByEmail`, {
    email,
  });

  return data;
};

exports.getAllUsers = async () => {
  console.log("STORAGE_URL getAllUsers");
  console.log(`${process.env.STORAGE_URL}/users`);
  const { data } = await axios.get(`${process.env.STORAGE_URL}/users`);

  return data;
};
