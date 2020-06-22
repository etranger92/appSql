/*************  HANDLEBARS  ************/
const handlebars = require("express-handlebars");
const path = require("path");
//const dirPath = path.join(process.cwd(), "/backend");
const dirPath = path.join(process.cwd());

const hbs = handlebars.create({
    layoutsDir: path.join(dirPath, "/views/layouts"),
    extname: ".hbs",
    defaultLayout: 'error',
    partialsDir: path.join(dirPath, "/views/partials")
});
module.exports = {
    hbs
};