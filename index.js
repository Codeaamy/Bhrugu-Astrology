const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const nodemailer = require("nodemailer");
const alert = require('alert');
require('dotenv').config();



const app = express();
const port = process.env.port || 3000

app.listen(port, (req, res) => {
  console.log(`Server started at ${port}`);
})

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))


const log = function (request, response, next) {
	console.log(`${new Date()}: ${request.protocol}://${request.get('host')}${request.originalUrl}`);
	console.log(request.body); // make sure JSON middleware is loaded before this line
	next();
}

app.use(log);

// HTTP POST
app.post("/email", function(request, response) {


  console.log('Button Pressed');
  
  const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_ID, // this should be YOUR GMAIL account
			pass: process.env.EMAIL_PASSWORD // this should be your password
		}
	});

	var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} PHONE_NUMBER: ${request.body.mobile} MESSAGE: ${request.body.message}`;
	var htmlBody = `<h2>Mail From Bhrugu Astrology Form</h2><p>from: ${request.body.name} <a href="mailto:${request.body.email}">${request.body.email}</a> Mobile: ${request.body.mobile}</p><p>${request.body.message}</p>`;
	var mail = {
		from: "battledeployment@gmail.com", // sender address
		to: "shreebhagwat94@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
		subject: "Contact Form Bhrugu Astrology", // Subject line
		text: textBody,
		html: htmlBody
  };
  
  var mail2 = {
    from: "battledeployment@gmail.com",
    to: request.body.email,
    subject: "Thank You For Contacting Bhrugu Astrology",
    text: "We have recieved your message. Someone will connect from Bhrugu Astrology to you in short time. Stay Glued!!",
    html: `<h2>Mail From Bhrugu Astrology Form</h2><p>from: Bhrugu Astrology <a href="mailto:${request.body.email}">${process.env.EMAIL_ID}</a> Mobile: 9765810211</p>`,
  };

	// send mail with defined transport object
	transporter.sendMail(mail, function (err, info) {
		if(err) {
			console.log(err);
			alert("message not sent, try again later" );
		}
		else {
      // response.json({ message: `message sent: ${info.messageId}` });
      alert("Message Sent Successful");
		}
  });
  
  transporter.sendMail(mail2, function (err, info) {
	
	});

});

app.get('/kundali/:userDetails', function (req, res) {
    const userData = req.params.userDetails.split(',')
    const name = userData[0]
    const year = userData[1]
    const date = userData[2]
    const hours = userData[3]
    const minutes = userData[4]
    const cityName = userData[5]
    const countryName = userData[6]
    const month = userData[7]
    let latitude
    let longitude
  
    const latLongUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_API_KEY}&q=${cityName}%20${countryName}&format=json`
    fetch(latLongUrl).then((response) => {
      return response.json()
    }).then((data) => {
      latitude = data[0].lat
      longitude = data[0].lon
      const timeZoneId = `http://api.geonames.org/timezoneJSON?lat=${latitude}&lng=${longitude}&username=${process.env.GEONAMES_TAG}`
      return fetch(timeZoneId)
    }).then((response) => {
      return response.json()
    }).then((data) => {
      const timeZoneId = data.timezoneId
      console.log(timeZoneId)
  
      const kundaliPostData = JSON.stringify({
        name: name,
        place: {
          name: `${cityName}, ${countryName}`,
          longitude: longitude,
          latitude: latitude,
          timeZoneId: timeZoneId
        },
        year: year,
        month: month,
        date: date,
        hour: hours,
        minutes: minutes,
        seconds: 0,
        options: {
          Ayanamsa: 'LAHARI'
        }
      })
  
      const kundaliUrl = process.env.HOROSCOPE_URL
  
      return fetch(kundaliUrl, {
        method: 'POST',
        headers: {
          'x-api-key': process.env.HOROSCOPE_API_KEY,
          'content-type': 'application/json'
        },
        body: kundaliPostData
      })
    }).then((response) => {
      return response.json()
    })
      .then((data) => {
        res.json(data)
      })

  })

app.post('/freeKundali', (req, res) => {  
    res.redirect('/freeKundali.html')
  })


  module.exports = app
