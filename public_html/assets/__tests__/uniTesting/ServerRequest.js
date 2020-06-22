jest.setTimeout(50000);
const {
    serverGet,
    serverPost
} = require("../../js/functions/sql/requestServer.js");

describe("Check Axios get and post request", () => {
    it('should be true as axios.get return an object', async () => {
        let params = {
            name: "hello",
        };
        let result = await serverGet("/someRoute", params);
        expect(result.data.someData[0]).toEqual("one")
    });
    it('should be true as axios.post return an object', async () => {
        let data = {
            name: "hello",
        };
        let result = await serverGet("/someRoute", data);
        expect(result.data.someData[1]).toEqual("two")
    });
})