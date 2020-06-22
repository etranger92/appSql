const Router = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.sendFile("index1.html");
});
//res.sendFile('index1.html', { root: path.join(__dirname, '../public') }); Ca pt etre ca


module.exports.home = router;

/*Reminder: 
- Redis is stored in the memory of the pc while sql on the harddrive which is slower to retrieve.
*/

/*let value = [...new Array(30)]
  .map((item) => ((Math.random() * 36) | 0).toString(36))
  .join("");*/