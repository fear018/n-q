module.exports = (schema) => {
  if (!schema) {
    throw new Error("GATEWAY Validation scheme is required!");
  }

  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      console.log("❌", error.details[0].message);
      return next(new Error(`GATEWAY ${error.details[0].message}`));
    }

    next();
  };
};
