const axios = require("axios")
const https = require("https")
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

module.exports = {
    async getWeatherByCountryStateCity(reminder) {

        await axios.get(encodeURI(`${config.urlWeather}${reminder.city},${reminder.state},br&APPID=${process.env.API_KEY_WEATHER}`), {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        )
            .then(function (response) {
                reminder.weather = response.data.weather
            })
            .catch(function (error) {
                console.log(error)
            })

    }
};