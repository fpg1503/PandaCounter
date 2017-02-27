var express    = require('express');
var app        = express();
var client 	   = require('redis').createClient(process.env.REDIS_URL);
var createHash = require('sha.js');
var sha256	   = createHash(sha256);


var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', (req, res) => {
	client.keys('*', (err, keys) => {
		res.json({ keys: keys });
	});
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

router.delete('/:animal', (req, res) => {
	var animal = req.params.animal;
	var password = req.query.password;

	if (password == undefined) {
		res.statusCode = 400
		res.json({ error: 'Please provide a password'});
	}

	var hashedPassword = sha256.update(password, 'utf8').digest('hex');
	if (hashedPassword == '171f0e636fc5a5ce5a3ada753320ee682e4876e752ac42dd891eda1ea6f4517f') {
		client.delete(animal, (error, reply) => {
			res.send(200)
		});
	} else {
		res.statusCode = 401
		res.json({ error: 'Invalid password'});
	}
});

app.use('/', router);

app.listen(port);
console.log('Listening to ' + port);