const axios = require("axios");

const serverGet = async (url, params) => {
    try {
        const result = await axios.get(url, {
            params
        });
        return result
    } catch (err) {
        console.log(err)
    }
};

let serverPost = async (url, data) => {
    try {
        const result = await axios.post(url, {
            data
        });
        return result
    } catch (err) {
        console.log(err)
    }
};


export {
    serverGet,
    serverPost
};