/************************REDIS*************************/
const redis = require("redis");
const connectRedis = require("connect-redis");
//session variable for persistence. express-session
const session = require("express-session");
const redisStore = connectRedis(session);
const redisClient = redis.createClient({
    port: 6379,
    host: "localhost",
});
const redisConfig = {
    store: new redisStore({
        client: redisClient,
    }),
    secret: "mySect", // will hash
    resave: false, // It means if I make a call and I do not update the session nothing has been writen I will not override the session. But needs more clarification as in some case we should turn it true
    saveUninitialized: false, // It will prevent a lot of empty session objects being stored in the session store. Since there's nothing useful to store, the session is "forgotten" at the end of the request.
    cookie: {
        secure: false, // turn true when you run this on server. It will only transmit throw htmls.
        httpOnly: false, // Prevents client side JS from reading the cookie.
        maxAge: 1000 * 60 * 60 * 24, // session max age in milliseconds.
    },
};

//RedisStore represents for persistant memory where we are going to save datas.
//The express session is not suffisciant as it is not scalable solution.

redisClient.on("connect", () => {
    console.log("Redis client connected");
});
redisClient.on("err", (err) => {
    console.log("Do not forget to start your server or" + err);
});

module.exports = {
    redisStore,
    redisClient,
    redisConfig,
};