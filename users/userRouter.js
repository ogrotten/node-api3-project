const express = require('express');
const userdb = require("./userDb.js")
const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', validateUserId, (req, res) => {
	clg(">>> GET by id.")
	res.send(req.user);
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
	userdb.getById(req.params.id)
		.then(user => {
			if (user) {
				clg(user);
				req.user = user;
				next();
			} else {
				res.status(404).json({
					message: "invalid user id",
					loc: "userRouter > validateUserId()",
					error: err
				})
			}
		})
		.catch(err => {
			res.status(500).json({
				message: "GET user problem",
				loc: "userRouter > validateUserId() > catch",
				error: err
			})
		})
}

function validateUser(req, res, next) {

}

function validatePost(req, res, next) {

}

module.exports = router;

function clg(...x) {
	for (let exes of x) console.log(exes);
}
