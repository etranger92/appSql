const {
    queryDataBase
} = require("../functions/sql/queryDB");
const {
    bcryptCompare
} = require("../functions/bcrypt");

let authentification = async (userDetail) => {
    try {
        let sql = `SELECT * from user WHERE name = "${userDetail.name}"`;
        let user = await queryDataBase(sql);
        if (!user[0].length) return false;
        let arePasswordsMatched = await bcryptCompare(
            userDetail.password,
            user[0][0].password
        );
        if (!arePasswordsMatched) return false;
        let id = user[0][0].user_id;
        return id
    } catch (err) {
        console.log(err)
    }
};

module.exports = {
    authentification
}