var express    = require('express');
var app        = express();
var client 	   = require('redis').createClient(process.env.REDIS_URL);

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', (req, res) => {
	res.json({ Hello: 'world'});
});

router.get('/:animal', (req, res) => {
	var animal = req.params.animal;
	client.get(animal, (err, reply) => {
	    res.json({ [animal]: reply || 0 });
	});
});

router.post('/:animal', (req, res) => {
	var animal = req.params.animal;
	client.incr(animal);
	client.get(animal, (err, reply) => {
	    res.json({ [animal]: reply || 0 });
	});
});


app.use('/', router);

app.listen(port);
console.log('Listening to ' + port);