import {
    serverGet,
    serverPost
} from "./requestServer.js"

let sqlCommentCreate = async (value) => {
    try {
        let data = {
            value
        };
        let result = await serverPost("/sqlCommentCreate", data);

        return result;
    } catch (err) {
        console.log("COMMENT CREATE JS/REDIS :", err)
    }
};
let sqlCommentDelete = async (id) => {
    try {
        let data = {
            id
        };
        const result = await serverPost("/sqlCommentDelete", data);
        return result
    } catch (err) {
        console.log("COMMENT DELETE JS/REDIS :", err)
        //Could send false to handle error
    }
}
let sqlCommentUpdate = async (value, id) => {
    try {

        let data = {
            value,
            id
        };
        const result = await serverPost("/sqlCommentUpdate", data);
        return result;
    } catch (err) {
        console.log("COMMENT UPDATE JS/REDIS :", err)
    }


}
export {
    sqlCommentCreate,
    sqlCommentDelete,
    sqlCommentUpdate
}