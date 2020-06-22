const {
    queryDataBase
} = require("../queryDB");

let sqlCommentCreate = async (comment, id) => {

    try {
        let sql = `INSERT INTO comments VALUES(NULL, "${comment}", '2022-10-09', ${id});`;
        let result = await queryDataBase(sql);
        if (result[0].insertId) {
            return result[0].insertId;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err, "+ ERRROR");
    }
};
let sqlCommentRead = async (req, res) => {
    try {
        let sql = `SELECT * FROM comments WHERE user_user_id = "${req.query.id}"`;
        let result = await queryDataBase(sql);
        if (result[0].length) {
            res.send({
                result,
            });
        } else {
            res.send("no comments");
        }
    } catch (err) {
        console.log(err);
        res.render("errorServer", {
            layout: "error",
            name,
        });
    }
};
let sqlCommentDelete = async (id) => {
    try {
        let sql = `DELETE FROM comments WHERE comments_id = "${id}"`;
        let result = await queryDataBase(sql);
        return (Boolean(result[0].affectedRows));
    } catch (err) {
        //Here, it's better to render a message in case if something went wrong that will be displayed in the actual page. Not a new page.
        console.log(err);
    }
};
let sqlCommentUpdate = async (value, id) => {
    try {

        let sql = `UPDATE comments SET comments = "${value}" WHERE comments_id = "${id}"`;
        let result = await queryDataBase(sql);
        return (Boolean(result[0].affectedRows));
    } catch (err) {
        //Here, it's better to render a message in case if something went wrong that will be displayed in the actual page. Not a new page.
        console.log(err);
    }
};

module.exports = {
    sqlCommentCreate,
    sqlCommentRead,
    sqlCommentUpdate,
    sqlCommentDelete
}