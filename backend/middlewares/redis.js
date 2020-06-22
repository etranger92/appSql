const {
  redisStore,
  redisClient,
  redisConfig
} = require("../config/redis")

let redisClientStore = async (req, res, next) => {
  try {
    if (!req.session || !req.session.clientId) {
      next();
    } else {
      res.redirect("/account")
    }
  } catch (err) {}
  //next will call next function midleware.
};

module.exports = {
  redisClientStore
}