const { verify, sign } = require("jsonwebtoken");
const { createHash } = require("crypto");

exports.createHash = (str) => {
  const hash = createHash("sha512");
  hash.update(str);

  return hash.digest("hex");
};

exports.createJwtTokenAsync = (payload = {}) =>
  new Promise((resolve, reject) => {
    const options = {
      expiresIn: "365d",
    };

    sign(payload, process.env.JWT_SECRET, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

exports.checkAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("Unauthorized. Token is required.");
  }

  const [_, token] = authorization.split(" "); // Bearer <token>

  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      next(new Error(`Unauthorized: ${err.message}`));
    } else {
      req.userTokenData = decoded;
      next();
    }
  });
};
