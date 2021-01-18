import './App.css';
import SelectCountries from './components/SelectCountries/SelectCountries'
import SelectCities from './components/SelectCities/SelectCities';
import Loading from './components/Loading/Loading'
import {useEffect, useState} from 'react';
const api = {
  key: "16a73ba1c35f97f1f44e5b4bcda3e5a9",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const convertor = require('persian-date');
  const [city,setCity] = useState("")
  const [country,setCountry] = useState("");
  const [weather,setWeather] = useState({});
  const [message,setMessage] = useState("")
  const [loading,setLoading] = useState(false);
  const [loadingMessage,setLoadingMessage] = useState("");

  const getCountry = (e) =>{
    setCountry(e.value);
  }

  const getCity = e =>{
    console.log(e);
    setCity(e.value);
  }

  const getPersianWeather = () =>{
    const txt=weather.weather[0].main;
    switch (txt) {
      case "Mist":
        return "غبارالود"
      case "Snow":
        return "برفی"
      case "Clear":
        return "صاف"
      case "Clouds":
        return "ابری"
      case "Rain":
        return "بارانی"
    
      default:
        return txt;
    }
  }

  const setData = async () =>{
    SetLoading(true,`دریافت اطلاعات اب و هوای شهر ${city.cityName} ...`);
    await fetch(`${api.base}weather?id=${city.id}&units=metric&APPID=${api.key}`)
        .then(res=>res.json())
        .then(data=>{
          if(data.cod !== "404")
          {
            setWeather(data);
          }else{
            setWeather({});
            setMessage("متاسفانه اطلاعات اب و هوای این شهر پیدا نشد ...")
          }
          SetLoading(false,"");
        });
  }
  const getDateTime = () =>{
    let d = new convertor(new Date());
    let date = {
      date:d.format("DD"),
      day:d.format("dddd"),
      month:d.format("MMMM"),
      year:d.format("YYYY")
    };
    return `${date.day} ${date.date} ${date.month} ${date.year}`;
  }

  const SetLoading = (active,message) =>{
    setLoading(active);
    setLoadingMessage(message);
  }
  
  const renderWeather = () =>{
    if(typeof weather.main === "undefined")
    {
      return (
        <div>
          <div className="location-box">
            <div className="message">{message}</div>
            <div className="date">{getDateTime()}</div>
          </div>
        </div>
      )
    }
    return (
      <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{getDateTime()}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{getPersianWeather()}</div>
          </div>
        </div>
    )
  }

  return (
    <div className={(typeof weather.main != "undefined") ? (weather.main.temp > 16 ? "app-warm" : "app") : "app"} >
      <main>
        <div className="search-box">
          <SelectCountries setLoading={SetLoading} getCountry={getCountry}/>
          <SelectCities setLoading={SetLoading} getCity={getCity} id={country}/>
          <button onClick={setData} className="search-btn">
            دریافت اطلاعات
          </button>
        </div>
        {renderWeather()}
      </main>
      <Loading message={loadingMessage} active={loading}/>
    </div>
  );
}
export default App;

