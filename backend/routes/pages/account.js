const Router = require("express");
const router = Router();

router.get("/account", async (req, res) => {
    try {
        if (req.session.clientId) {
            res.render("contain/profile/userComments", {
                layout: "account",
                comments: req.session.comments
            });
        } else {
            res.redirect("/")
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports.account = router;