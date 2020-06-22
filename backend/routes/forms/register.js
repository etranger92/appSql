//ADD USER IN THE DATABASE (DB) AFTER CHECKING SECURITY.
const Router = require("express");
const router = Router();
const {
  validatorRules,
  validator,
} = require("../../middlewares/security.js")
const {
  accountCreation
} = require("../../logic/accountCreation.js")

router.post("/accountNew", validatorRules(), validator, async (req, res) => {
  const {
    name,
    password
  } = req.body;
  try {
    let result = await accountCreation(name, password);
    if (result) {
      res.render("contain/successMessage", {
        layout: "success",
        name,
      });
    } else {
      res.render("contain/errors/error500", {
        layout: "error",
        //MySQL pb
        error: "The site is under maintenance. If you encouter this issue later on please contact us"
      });
    }
  } catch (err) {
    console.log("REGISTERED FAILED: ", err);
    res.render("contain/errors/error500", {
      layout: "error",
      error: "In case if it happens again, contact us to this mail lopean@dsdks.com and provide us the code error which is:222"
    });
  }
});

module.exports.register = router;