const {
    bcryptCompare,
    bcryptHash
} = require("../functions/bcrypt");
const {
    queryDataBase
} = require("../functions/sql/queryDB")

const accountCreation = async (name, password) => {
    let passwordHashed = await bcryptHash(password);
    let sqlNewUser = `INSERT INTO user VALUES(NULL, "${name}", "${passwordHashed}","2046-09-22")`;
    let isUserSaved = await queryDataBase(sqlNewUser);
    let result = (isUserSaved[0].affectedRows === 1) ? true : false;
    return result
}
module.exports = {
    accountCreation
}