require('dotenv').config();
const sauce = require('apisauce');
const email = require('emailjs/email');

const address = 'throwaway.mailer42@gmail.com';
const server = email.server.connect({
  user: address,
  password: 'stbuvjgbzjydmgew',
  host: 'smtp.gmail.com',
  ssl: true
});

const darksky = sauce.create({
  baseURL: 'https://api.darksky.net'
});

const api = sauce.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

const google = sauce.create({
  baseURL: `https://maps.googleapis.com`
});

const getLatLng = location => {
  return google
    .get('/maps/api/geocode/json', {
      key: process.env.REACT_APP_GOOGLE_API_KEY,
      address: location
    })
    .then(res => res.data.results[0].geometry.location);
};

const getUsers = () => {
  return api.get('/api/users').then(res => res.data);
};

const getWeather = location => {
  return darksky
    .get(
      `/forecast/${process.env.DARK_SKY_API_KEY}/${location.lat},${location.lng}`
    )
    .then(res => res.data);
};

// icon properties: clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night

const getMessage = (weather, location) => {
  const message = {
    subject: `Enjoy a discount on us.`,
    body: `Current weather in ${location}: ${Math.round(
      weather.currently.temperature
    )} degrees, ${weather.currently.summary.toLowerCase()}`
  };
  if (
    weather.currently.icon.includes('clear') ||
    weather.currently.temperature >= weather.daily.data[0].temperatureHigh + 5
  ) {
    message.subject = `It's nice out! Enjoy a discount on us.`;
  }
  if (
    weather.currently.precipProbability > 0 ||
    weather.currently.temperature + 5 <= weather.daily.data[0].temperatureHigh
  ) {
    message.subject = `Not so nice out? That's okay, enjoy a discount on us.`;
  }
  return message;
};

const testUser = {
  _id: '5e3069f15b1e03101f895f50',
  email: 'lcurran327@gmail.com',
  location: 'Boston, MA, USA',
  __v: 0
};

const sendEmail = user => {
  getLatLng(user.location)
    .then(location => getWeather(location))
    .then(weather => getMessage(weather, user.location))
    .then(message => {
      server.send(
        {
          text: message.body,
          from: `Lindsey Curran <${address}>`,
          to: `<${user.email}>`,
          subject: message.subject
        },
        (err, _message) => {
          console.log(err || `message sent to: ${user.email}`);
        }
      );
    });
};

const emailSubscribers = () => {
  getUsers().then(users => users.forEach(user => sendEmail(user)));
};

emailSubscribers();
