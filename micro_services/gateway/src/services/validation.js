module.exports = (schema) => {
  if (!schema) {
    throw new Error("Validation scheme is required!");
  }

  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      console.log("❌", error.details[0].message);
      return next(new Error(error.details[0].message));
    }

    next();
  };
};
