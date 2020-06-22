/****************************BCRYPTS ******************/
const bcrypt = require("bcryptjs");
const bcryptHash = async (password) => {
    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.log(err, +"Bcrypt error")
    }
};
const bcryptCompare = async (password, hash) => {
    let isEqual = await bcrypt.compare(password, hash);
    return isEqual;
};

module.exports = {
    bcryptCompare,
    bcryptHash
}