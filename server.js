const express = require('express');
const server = express();
const userRouter = require("./users/userRouter.js");

server.use(express.json());
server.use("/user", userRouter)

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//custom middleware

function logger(req, res, next) {
	clg(`>>> ${req.method}, ${req.originalUrl}, ${Date.now()}`)
	next();
}

module.exports = server;

function clg(...x) {
	for (let exes of x) console.log(exes);
}
