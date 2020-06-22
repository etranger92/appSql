const Router = require("express");
const router = Router();
const {
    authentification
} = require("../../logic/authentification");
const {
    sqlCommentCreate,
    sqlCommentRead,
    sqlCommentUpdate,
    sqlCommentDelete
} = require("../../functions/sql/comments/sqlCommentCrud")

router.post("/sqlCommentCreate", async (req, res) => {
    try {
        let resultId = await sqlCommentCreate(req.body.value, req.session.idSql);
        if (!resultId) return false
        let comment = {
            id_comments: resultId,
            comments: req.body.value
        };
        req.session.comments.push(comment)
        req.session.save();
        res.send(resultId.toString())
    } catch (err) {
        console.log("REDIS CREATE FAILED :", err);
    }
});
router.post("/sqlCommentRead", async (req, res) => {
    try {
        let resultId = await sqlCommentRead(req.body.value, req.session.idSql);
        if (!resultId) return false;
        return resultId;
    } catch (err) {
        console.log("REDIS CREATE FAILED :", err);

    }
});
router.post("/sqlCommentUpdate", async (req, res) => {
    try {
        let resultId = await sqlCommentUpdate(req.body.value, req.body.id);
        if (req.session) {
            req.session.comments.map(comment => {
                if (comment.id_comments == req.body.id) comment.comments = req.body.value
            })
        }
        res.send(resultId);
    } catch (err) {
        console.log("REDIS CREATE FAILED :", err);

    }
});
router.post("/sqlCommentDelete", async (req, res) => {
    try {
        let resultId = await sqlCommentDelete(req.body.id);
        if (!resultId) return false;
        let isId = value => value.id_comments == req.body.id;
        let index = req.session.comments.findIndex(isId);
        req.session.comments.splice(index, 1);
        req.session.save();
        res.send(true)
    } catch (err) {
        console.log("REDIS CREATE FAILED :", err);

    }
});

module.exports.sqlCommentCreate = router;
module.exports.sqlCommentRead = router;
module.exports.sqlCommentUpdate = router;
module.exports.sqlCommentDelete = router;