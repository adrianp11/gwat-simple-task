var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simple Task API - Post' });
});

router.post('/', function(req, res, next) {
	//Check Post validity
	var post = req.body;
	if(!post.title || !post.body || !post.category) {
		res.status(400);
		res.json({
			"error": "Incorrect Data"
		});
	} else {
		try {
			req.getConnection(function(err, conn) {
				if (err){
					console.error('SQL Connection Error: ', err);
					return next(err);
				}  

				conn.query('INSERT INTO Post(title, body, category_id, subject) VALUES (?, ?, ?, ?)', [post.title, post.body, post.category, post.subject], function(err, rows, fields){
					if(err){
						console.error('SQL Error: ', err);
						return next(err);
					}

					res.json({
						"msg": "Good bitch"
					});
				});
			});
		} catch(ex){
			console.error("Internal Error: ", ex);
			return next(ex);
		};


	}
});

module.exports = router;
