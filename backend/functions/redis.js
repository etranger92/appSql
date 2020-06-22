let redisHmset = (key, password) => {
    redisClient.hmset(key, {
        password,
    });
};
let redisRetrieve = (user) => {
    let result = redisClient.hgetall(user, (err, object) => {
        if (err) throw err;
        if (object) {
            return object;
        }
    });
    return result;
};