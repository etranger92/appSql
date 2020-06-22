const Router = require("express");
const router = Router();

router.get("*", (req, res) => {
  res.render("contain/errors/error404", {
    layout: "error",
  });
});

module.exports.error404 = router;