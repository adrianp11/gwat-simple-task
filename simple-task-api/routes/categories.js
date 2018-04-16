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

			conn.query('SELECT * FROM category', [], function(err, rows, fields){
				if(err){
					console.error('SQL Error: ', err);
					return next(err);
				}
				
				var categories = [];
				for (var venIndex in rows){
					categories.push(rows[venIndex].name);
				}
				res.json(categories);
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

