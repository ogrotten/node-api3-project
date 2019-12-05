const express = require('express');
const userdb = require("./userDb.js")
const postdb = require("../posts/postDb.js")
const router = express.Router();

router.get('/', (req, res) => {
	userdb.get(req.query)
		.then(users => {
			res.send(users)
		})
		.catch(err => {
			res.status(500).json({
				message: "POST user problem",
				loc: "userRouter > router.post() > catch",
				error: err
			})
		})

});

router.get('/:id', validateUserId, (req, res) => {
	clg(">>> GET by id.")
	res.send(req.user);
});

router.get('/:id/posts', (req, res) => {
	userdb.getUserPosts(req.params.id)
	.then(postsAll => {
		res.status(200).json(postsAll);
	})
	.catch(err => {
		res.status(500).json({
			message: "POST comment GET all posts problem",
			loc: "userRouter > router.post > userdb.insert > userdb.getUserPosts > catch",
			error: err
		})
	})
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.post('/', validateUser, (req, res) => {
	clg(req.body);
	userdb.insert(req.body)
		.then(user => {
			res.status(200).json({user});
		})
		.catch(err => {
			res.status(500).json({
				message: "POST user problem",
				loc: "userRouter > router.post() > catch",
				error: err
			})
		})
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
	clg("64",req.body);

	postdb.insert(req.body)
		.then(postOne => {
			
			userdb.getUserPosts(req.params.id)
			.then(postsAll => {
				res.status(200).json({postsAll});
			})
			.catch(err => {
				res.status(500).json({
					message: "POST comment GET all posts problem",
					loc: "userRouter > router.post > userdb.insert > userdb.getUserPosts > catch",
					error: err
				})
			})

		})
		.then(x => {})
		.catch(err => {
			res.status(500).json({
				message: "POST comment problem",
				loc: "userRouter > router.post() > catch",
				error: err
			})
		})
});

//custom middleware

function validatePost(req, res, next) {
	if (Object.keys(req.body).length === 0) {
		res.status(400).json({
			message: "need a body",
			loc: "userRouter > validatePost()",
		})
	}
	if (!req.body.text) {
		res.status(400).json({
			message: "need text field",
			loc: "userRouter > validateUser()",
		})
	}
	next();
}

function validateUserId(req, res, next) {
	userdb.getById(req.params.id)
		.then(user => {
			if (user) {
				clg("113",user);
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
	if (Object.keys(req.body).length === 0) {
		res.status(400).json({
			message: "need a body",
			loc: "userRouter > validateUser()",
		})
	}
	if (!req.body.name) {
		res.status(400).json({
			message: "need name field",
			loc: "userRouter > validateUser()",
		})
	}
	next();
}

module.exports = router;

function clg(...x) {
	console.log(...x);
}
