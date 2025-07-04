const allowedParams = {
  page: { msg: "Page param should be a number", format: isNaN },
};

function validateQueryParams(req, res, next) {
  try {
    if (req.query) {
      for (const [key, val] of Object.entries(req.query)) {
        if (!allowedParams[key]) throw new Error("Invalid query param");
        if (allowedParams[key].format(val)) throw new Error(allowedParams[key].msg);
      }
    }
    next();
  } catch (err) {
    console.error(err);
    const errorMessage = err?.message || "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}

module.exports = { validateQueryParams };
