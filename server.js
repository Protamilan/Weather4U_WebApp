const express = require('express');
const path = require('path');
const axios = require('axios');
var bodyParser = require('body-parser');
require('dotenv').config()


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    var data=""
    var values=[];
   res.render("index.ejs",{data:data,suggestions:values});
  
});

const api=process.env.AUTO_API_KEY;

app.post('/auto', async (req, res) => {
    const place = req.body.place;
    console.log(place);
  

    if (!place) {
      return res.status(400).send('Place is required');
    }
  
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(place)}&apiKey=${encodeURIComponent(api)}`;
    
    try {
      const response = await axios.get(url);
      data = response.data;
      values=[];
      for (let i = 0; i < data.features.length; i++) {
        const feature = data.features[i];
        const formattedValue = feature.properties["formatted"];
        values.push(formattedValue);
      }
      console.log(values);
      res.json(values);
    } catch (error) {
      console.error('Error fetching from Geoapify:', error.response ? error.response.data : error.message);
      res.status(500).send('Error fetching location data');
    }
  });
  
app.post("/weather", async (req, res) => {
    const plac = req.body.place;
    function getFirstWord(sentence) {
        const match = sentence.trim().match(/([a-zA-Z]+)/);
        return match ? match[0].trim() : ''; 
    }

    const place = getFirstWord(plac);
    console.log(place)
    const geoapi = process.env.GEO_API_KEY;
    const weatherapi = process.env.WEATHER_API_KEY;

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place)}&key=${encodeURIComponent(geoapi)}`;
    try {
        const georesponse = await axios.get(url);
        const data = georesponse.data;
        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherapi}&units=metric`;
            const pollution = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lng}&appid=${weatherapi}`;
            const air = await axios.get(pollution);
            const wresponse = await axios.get(weatherUrl);
            const aqi = air.data;
            const airpollution = aqi.list[0].main.aqi;
            const weatherdata = wresponse.data;
            const temp = Math.round(weatherdata.main.temp);
            const desc = weatherdata.weather[0].description;
            const humi = weatherdata.main.humidity;
            const wind = weatherdata.wind.speed;
            var logo = '';
            const d = new Date();
            let hour = d.getHours();
            console.log(hour);
            var bool = false;
            var level='';
            switch(airpollution){
                case 1:
                    level="Good Air Condition";
                    break;
                case 2:
                    level="Moderate Air Condition";
                    break;
                case 3:
                    level="Unhealthy Air Condition"; 
                    break;
                case 4:
                    level="Very Unhealthy Air Condition";
                    break;
                case 5:
                    level="Hazardous Air Condition";
                    break;               
            }

            switch (desc) {
                case ("clear sky"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/01d@2x.png" : "https://openweathermap.org/img/wn/01n@2x.png";
                    break;
                case ("few clouds"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/02d@2x.png" : "https://openweathermap.org/img/wn/02n@2x.png";
                    break;
                case ("scattered clouds"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/03d@2x.png" : "https://openweathermap.org/img/wn/03n@2x.png";
                    break;
                case ("broken clouds"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/04d@2x.png" : "https://openweathermap.org/img/wn/04n@2x.png";
                    break;
                case ("shower rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/10d@2x.png" : "https://openweathermap.org/img/wn/10n@2x.png";
                    break;
                case ("thunderstorm"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/11d@2x.png" : "https://openweathermap.org/img/wn/11n@2x.png";
                    break;
                case ("snow"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("mist"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/50d@2x.png" : "https://openweathermap.org/img/wn/50n@2x.png";
                    break;
                case ("overcast clouds"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/03d@2x.png" : "https://openweathermap.org/img/wn/03n@2x.png";
                    break;
                case ("smoke"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/50d@2x.png" : "https://openweathermap.org/img/wn/50n@2x.png";
                    break;
                case ("haze"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/50d@2x.png" : "https://openweathermap.org/img/wn/50n@2x.png";
                    break;
                case ("sand"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/50d@2x.png" : "https://openweathermap.org/img/wn/50n@2x.png";
                    break;
                case ("dust whirls"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/50d@2x.png" : "https://openweathermap.org/img/wn/50n@2x.png";
                    break;
                case ("fog"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/50d@2x.png" : "https://openweathermap.org/img/wn/50n@2x.png";
                    break;
                case ("dust"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/50d@2x.png" : "https://openweathermap.org/img/wn/50n@2x.png";
                    break;
                case ("volcanic ash"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/50d@2x.png" : "https://openweathermap.org/img/wn/50n@2x.png";
                    break;
                case ("squalls"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/50d@2x.png" : "https://openweathermap.org/img/wn/50n@2x.png";
                    break;
                case ("tornado"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/50d@2x.png" : "https://openweathermap.org/img/wn/50n@2x.png";
                    break;
                case ("light snow"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("heavy snow"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("sleet"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("light shower sleet"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("shower sleet"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("light rain and snow"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("rain and snow"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("light shower snow"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("shower snow"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("heavy shower snow"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("light rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/10d@2x.png" : "https://openweathermap.org/img/wn/10n@2x.png";
                    break;
                case ("moderate rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/10d@2x.png" : "https://openweathermap.org/img/wn/10n@2x.png";
                    break;
                case ("heavy intensity rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/10d@2x.png" : "https://openweathermap.org/img/wn/10n@2x.png";
                    break;
                case ("very heavy rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/10d@2x.png" : "https://openweathermap.org/img/wn/10n@2x.png";
                    break;
                case ("extreme rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/10d@2x.png" : "https://openweathermap.org/img/wn/10n@2x.png";
                    break;
                case ("freezing rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/13d@2x.png" : "https://openweathermap.org/img/wn/13n@2x.png";
                    break;
                case ("light intensity shower rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("shower rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("heavy intensity shower rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("shower drizzle"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("ragged shower rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("light intensity drizzle"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("drizzle"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("heavy intensity drizzle"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("light intensity drizzle rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("drizzle rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("heavy intensity drizzle rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("shower rain and drizzle"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("heavy shower rain and drizzle"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/09d@2x.png" : "https://openweathermap.org/img/wn/09n@2x.png";
                    break;
                case ("thunderstorm with light rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/11d@2x.png" : "https://openweathermap.org/img/wn/11n@2x.png";
                    break;
                case ("thunderstorm with rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/11d@2x.png" : "https://openweathermap.org/img/wn/11n@2x.png";
                    break;
                case ("thunderstorm with heavy rain"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/11d@2x.png" : "https://openweathermap.org/img/wn/11n@2x.png";
                    break;
                case ("light thunderstorm"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/11d@2x.png" : "https://openweathermap.org/img/wn/11n@2x.png";
                    break;
                case ("heavy thunderstorm"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/11d@2x.png" : "https://openweathermap.org/img/wn/11n@2x.png";
                    break;
                case ("ragged thunderstorm"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/11d@2x.png" : "https://openweathermap.org/img/wn/11n@2x.png";
                    break;
                case ("thunderstorm with light drizzle"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/11d@2x.png" : "https://openweathermap.org/img/wn/11n@2x.png";
                    break;
                case ("thunderstorm with drizzle"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/11d@2x.png" : "https://openweathermap.org/img/wn/11n@2x.png";
                    break;
                case ("thunderstorm with heavy drizzle"):
                    bool = (hour >= 6 && hour <= 17);
                    console.log(bool);
                    logo = bool ? "https://openweathermap.org/img/wn/11d@2x.png" : "https://openweathermap.org/img/wn/11n@2x.png";
                    break;


            }

            

            console.log(lat);
            console.log(lng);
            console.log(temp);
            console.log(desc);
            console.log(humi);
            console.log(wind);
            console.log(airpollution);

            res.render('weather.ejs', {
                lat: lat,
                lng: lng,
                temp: temp,
                desc: desc,
                humi: humi,
                wind: wind,
                aqi: airpollution,
                logoUrl: logo,
                place:plac,
                condition:level
            });
        } else {
            res.status(404);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500);
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
