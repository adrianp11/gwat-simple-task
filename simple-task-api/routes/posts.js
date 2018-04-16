var express = require('express');
var router = express.Router();

/* GET posts listing. */
router.get('/', function(req, res, next) {
  	try {

		req.getConnection(function(err, conn) {
			if (err){
				console.error('SQL Connection Error: ', err);
				return next(err);
			}  

			conn.query('SELECT * FROM posts', [], function(err, rows, fields){
				if(err){
					console.error('SQL Error: ', err);
					return next(err);
				}
				
				var posts = [];
				for (var venIndex in rows){
					var post = {};
					post.id = rows[venIndex].id;
					post.title = rows[venIndex].title;
					post.body = rows[venIndex].body;
					post.subject = rows[venIndex].subject;
					post.category = rows[venIndex].category;
					posts.push(post);
				}
				res.json(posts);
			});
		});
	} catch(ex){
		console.error("Internal Error: ", ex);
		return next(ex);
	};
});

function responseError(res, msg){
	var err_response = {};
	err_response.error = msg;
	res.json(err_response);
}

module.exports = router;

