const {
    mysql,
    config
} = require("../../config/sql");

let queryDataBase = async (sql, type) => {
    let connectToDB;
    try {
        //Get connected to database
        let db = mysql.createPool(config);
        connectToDB = await db.getConnection();
        //Query
        let dataReceived = await connectToDB.execute(sql);
        //Data received
        return dataReceived;
    } catch (err) {
        console.log(err);
    } finally {
        connectToDB.release();
    }
};

module.exports = {
    queryDataBase,
}