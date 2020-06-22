const {
    queryDataBase
} = require("../functions/sql/queryDB");

//We retrieves informations from SQL 
const redisCreateSession = async (id) => {
    try {
        let idSession = [...new Array(30)]
            .map((item) => ((Math.random() * 36) | 0).toString(36))
            .join('');
        let sql = `SELECT comments_id, comments from comments WHERE user_user_id = "${id}"`;
        let comments = await queryDataBase(sql);
        let commentsClient = comments[0].map(element => {
            return {
                id_comments: element.comments_id,
                comments: element.comments
            }
        });
        let clientDatas = {
            id: idSession,
            comments: commentsClient,
        }
        return clientDatas

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    redisCreateSession,
};