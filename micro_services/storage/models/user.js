const prisma = require("../db-client");

exports.createUser = async (name, email, hash) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      hash,
    },
  });
};

exports.getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      hash: true,
    },
  });
};

exports.getAllUsers = async () => {
  return await prisma.user.findMany();
};
