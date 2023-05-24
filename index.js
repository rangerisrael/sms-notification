const express = require('express');
var Semaphore = require('semaphore-sms-api');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config('./env');

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

var apikey =process.env.KEY;
var sms = new Semaphore(apikey);

// To send a single SMS message:


app.get('/status', (req, res) => {
	// To check your account status:
	sms.account(function (error, result) {
		if (!error) console.log(result);
	});
});

app.get('/test', (req, res, next) => {
	   
	res.send('Hellow World')
});
app.post('/notify-users', (req, res, next) => {
	var payload = {
		sendername: 'SEMAPHORE',
		number: req.body.phone,
		message: req.body.message,
	};

	sms.sendsms(payload, function (error, result) {
		if (!error) {
			res.send(result);
		} else console.log(error);
	});    

});