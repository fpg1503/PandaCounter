const express = require('express')
const app = express()
const client = require('redis').createClient(process.env.REDIS_URL)
const createHash = require('sha.js')

const port = process.env.PORT || 8080

const router = express.Router()

router.get('/', (req, res) => {
	client.keys('*', (err, keys) => {
		res.json({ animals: keys })
	})
})

router.get('/:animal', (req, res) => {
	const animal = req.params.animal
	client.get(animal, (err, reply) => {
		res.json({ [animal]: reply || 0 })
	});
});

router.post('/:animal', (req, res) => {
	const animal = req.params.animal
	client.incr(animal)
	client.get(animal, (err, reply) => {
		res.json({ [animal]: reply || 0 })
	})
})

router.delete('/:animal', (req, res) => {
	const animal = req.params.animal
	const password = req.query.password

	if (password == undefined) {
		res.statusCode = 400
		res.json({ error: 'Please provide a password' })
	}
	var sha256 = createHash('sha256')
	var hashedPassword = sha256.update(password, 'utf8').digest('hex')
	if (hashedPassword == '171f0e636fc5a5ce5a3ada753320ee682e4876e752ac42dd891eda1ea6f4517f') {
		client.del(animal, (error, reply) => {
			res.send(200)
		})
	} else {
		res.statusCode = 401
		res.json({ error: 'Invalid password' })
	}
})

app.use('/', router)

app.listen(port)
console.log('Listening to ' + port)