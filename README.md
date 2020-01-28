# Weather app

This app was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app), and uses [@material-ui](https://material-ui.com), [apisauce](https://github.com/infinitered/apisauce), [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), and [lodash.throttle](https://www.npmjs.com/package/lodash.throttle)

The server is written in Node using [Express](https://expressjs.com/), [cors](https://www.npmjs.com/package/cors), and [Mongoose](https://mongoosejs.com), to connect to a [MongoDB](https://www.mongodb.com) database.

The email script uses [emailjs](https://www.npmjs.com/package/emailjs), the [darksky API](https://darksky.net/dev), and [Google Geocoder](https://developers.google.com/maps/documentation/geocoding/start)

## Configuration

If you do not have MongoDB installed to run the app locally, you can do so by following the instructions [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials);

Once mongo is installed, run `mongod` to start the db.

Create a .env file in the root folder and add the keys `REACT_APP_GOOGLE_API_KEY=YOUR_API_KEY` and `DARK_SKY_API_KEY=YOUR_API_KEY`. To generate API keys for these services, go to the [Google Cloud Developer Console](https://console.cloud.google.com/google/maps-apis/overview), and click "All Google Maps APIs", then enable the Geocoding API, the Maps JavaScript API, and the Places API, then follow the steps [here](https://developers.google.com/maps/documentation/javascript/get-api-key#get-the-api-key) here to generate an API key. For the Dark Sky API, all you need to do is create an account [here](https://darksky.net/dev) and it will generate an API key for you.

Finally, install dependencies using `npm install`.

## Startup

To run the production built app and server, use `npm run server` and visit localhost:3001. `npm start` will run just the client app in dev mode at localhost:3000.

To run the script, use `npm run email`;
