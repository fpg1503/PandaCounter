var express    = require('express');
var app        = express();
var client 	   = require('redis').createClient(process.env.REDIS_URL);

var port = process.env.PORT || 8080;


var router = express.Router();

router.get('/:animal', (req, res) => {
	var animal = req.params.animal;
	client.get(animal, (err, reply) => {
		var response = {};
		response[animal] = reply || 0;
	    res.json(response);   
	});
});

router.post('/:animal', (req, res) => {
	var animal = req.params.animal;
	client.incr(animal);
	client.get(animal, (err, reply) => {
	    var response = {};
		response[animal] = reply || 0;
	    res.json(response);
	});
});


app.use('/', router);

app.listen(port);
console.log('Listening to ' + port);