const get = () => {
    return Promise.resolve({
        data: {
            someData: ["one", "two"]
        }
    });
};
/*
const get = () => {
    return Promise.resolve(false);
};
*/
const post = () => {
    return Promise.resolve({
        data: {
            someData: ["one", "two"]
        }
    });
}
export {
    get,
    post
}