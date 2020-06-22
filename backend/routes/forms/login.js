const Router = require("express");
const router = Router();
const {
    authentification
} = require("../../logic/authentification");
const {
    redisClientStore
} = require("../../middlewares/redis");
const {
    redisCreateSession
} = require("../../logic/redisSessionCreate");

router.post("/login", redisClientStore, async (req, res) => {
    try {
        let userInMySQL = await authentification(req.body);
        let id = userInMySQL;
        if (userInMySQL) {
            let infos = await redisCreateSession(id);
            req.session.clientId = infos.id;
            req.session.comments = infos.comments;
            req.session.idSql = id;
            res.redirect("/account");
        } else {
            res.send(false);
        }
    } catch (err) {
        console.log("LOGIN FAILED :", err);
        res.render("contain/errors/error500", {
            layout: "error",
            error: "In case if it happens again, contact us to this mail lopean@dsdks.com and provide us the code error which is:222"
        });
    }
});

module.exports.login = router;