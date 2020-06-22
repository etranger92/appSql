const {
    sqlCommentCreate,
    sqlCommentDelete,
    sqlCommentUpdate
} = require("../../js/functions/sql/sqlCommentCrud.js");

describe("Checks all CRUD operation for SQL ", () => {
    it('should be true as axios.get return an object', async () => {
        try {
            let result = await sqlCommentCreate("newComment");
            expect(result.data.someData[0]).toEqual("one")

        } catch (err) {
            console.log(err)
        }
    })
    it('should commentDelete return true', async () => {
        try {
            let result = await sqlCommentDelete("newComment");
            expect(result.data.someData[0]).toEqual("one")

        } catch (err) {
            console.log(err)
        }
    })
    it('should commentUpdate return true', async () => {
        try {
            let result = await sqlCommentUpdate("newComment", "45");
            expect(result.data.someData[0]).toEqual("one")
        } catch (err) {
            console.log(err)
        }
    })
})