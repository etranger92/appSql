let redisCommentCreate = (session, id) => {
    try {
        let comment = {
            id_comments: id,
            comments: req.body.value
        };
        req.session.comments.push(comment)
        req.session.save();
        next();
    } catch (err) {
        console.log("REDIS CREATE FAILED :", err);

    }
};

let redisCommentDelete = async (session, id) => {
    try {
        let isId = value => value.id_comments == req.body.id;
        let index = req.session.comments.findIndex(isId);
        req.session.comments.splice(index, 1);
        req.session.save();
        return result
    } catch (err) {
        console.log("REDIS DELETE FAILED :", err);
        //could send false to display an error mess

    }
};

module.exports = {
    redisCommentCreate,
    redisCommentDelete
}