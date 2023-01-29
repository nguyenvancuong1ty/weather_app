import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faCloudSun, faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [datainput, setDatainput] = useState("");
  const [city, setCity] = useState("Ha Noi");
  const [country, setCountry] = useState("VN");
  const [temperature, setTemperature] = useState(25);
  const [status, setStatus] = useState("rain");
  const [visibility, setVisibilty] = useState("500");
  const [wind, setWind] = useState("2");
  const [cloud, setCloud] = useState("22");
  const [time, setTime] = useState("09:14:37, 28/11/2022");

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${datainput}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`
    )
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  }, [datainput]);

  const handleOnKeyDown = (e) => {
    const timer = new Date().toLocaleString();
    if (e.key === "Enter") {
      if (data.name) {
        setCity(data.name);
        setCountry(data.sys.country);
        setTime(timer);
        setTemperature(data.main.temp);
        setStatus(data.weather[0].main);
        setVisibilty(data.visibility);
        setWind(data.wind.speed);
        setCloud(data.clouds.all);
      } else {
        alert("City is not define!!");
      }
    }
  };
  return (
    <div className="App">
      <div className={temperature >= 18 ? "container hot" : "container cold"}>
      <div id="weather">
        <input
          tabIndex="0"
          onKeyDown={handleOnKeyDown}
          type="text"
          value={datainput}
          onChange={(e) => {
            setDatainput(e.target.value);
          }}
          placeholder="Search..."
          className="input-search"
        />
        <div className="content">
          <h1 className="name">
            <span className="city">{city}</span>
            <span>,</span>
            <span className="country">{country}</span>
          </h1>
          <p className="time">{time}</p>
          <div className="temperature">
            <span className="value">{temperature}</span>
            <span>
              <sup>o</sup>C
            </span>
          </div>
          <div className="short-desc">{status}</div>
          <div className="more-desc">
            <div className="visibility">
              <FontAwesomeIcon icon={faEye} />
              <span>{`${visibility} (m)`}</span>
            </div>
            <div className="wind">
              <FontAwesomeIcon icon={faWind} />
              <span>{`${wind} (m/s)`}</span>
            </div>
            <div className="cloud">
              <FontAwesomeIcon icon={faCloudSun} />
              <span>{`${cloud} (m/s)`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
