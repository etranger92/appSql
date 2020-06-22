const Router = require("express");
const router = Router();
const {
    queryDataBase
} = require("../../functions/sql/queryDB");
const {
    authentification
} = require("../../logic/authentification")

router.get("/checkName", async (req, res) => {
    try {
        let sql = `SELECT * FROM user WHERE name = "${req.query.name}"`;
        let result = await queryDataBase(sql);
        if (result[0].length) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (err) {
        // At this stage, I do not want to frustrate the user by render anythings. If something is wrong he will know when submiting form.
        console.log(err);
    }
});

router.post("/checkUser", async (req, res) => {
    try {
        let userInMySQL = await authentification(req.body);
        if (userInMySQL) {
            res.send(true)
        } else {
            res.send(false)
        };
    } catch (err) {
        // At this stage, I do not want to frustrate the user by render anythings. If something is wrong he will know when submiting form.
        console.log(err);
    }
});

module.exports.checkName = router;
module.exports.checkUser = router;