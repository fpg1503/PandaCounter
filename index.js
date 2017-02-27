var express    = require('express');
var app        = express();
var client 	   = require('redis').createClient(process.env.REDIS_URL);

var port = process.env.PORT || 8080;


var router = express.Router();

router.get('/:animal', function(req, res) {
	res.json({ 'animal': req.params.animal });
	// client.get('iOS', function(err, reply) {
	    // res.json({ 'iOS': reply || 0 });   
	// });
});

router.post('/iOS', function(req, res) {
	client.incr('iOS');
	client.get('iOS', function(err, reply) {
	    res.json({ 'iOS': reply || 0 });   
	});
});


app.use('/', router);

app.listen(port);
console.log('Listening to ' + port);