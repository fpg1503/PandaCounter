var express    = require('express');
var app        = express();
var client 	   = require('redis').createClient(process.env.REDIS_URL);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var router = express.Router();

router.get('/iOS', function(req, res) {
	client.get('iOS', function(err, reply) {
	    res.json({ "iOS": reply });   
	});
});


app.use('/', router);

app.listen(port);
console.log('Magic happens on port ' + port);