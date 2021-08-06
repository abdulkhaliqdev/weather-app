import './style.css';
import Header from './header';

const countryList = require("country-list");
const icon = require('simple-icons/icons/elasticsearch');

async function getdata(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f31d1d7e61a6d0091456d075c434ce78`;
  const respon = await fetch(url, { origin: "cors" });
  const data = await respon.json();

  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `
    <div class='card'>
      <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
      <small>${data.weather[0].main}</small>
    </div>
    `;

  document.body.appendChild(weather);
}

function KtoC(temp) {
  return (temp - 273.15).toFixed(2);
}

function DisplayWeather(data) {
  const form = document.createElement("div");
  form.setAttribute("id", "form");
  const input = document.createElement("input");
  input.setAttribute("type", "search");
  input.setAttribute("id", "search");
  input.setAttribute("list", countryList.getNames());
  const submit = document.createElement("input");
  submit.setAttribute("id", "c");
  submit.setAttribute("type", "button");
  submit.setAttribute("value", "submit");

  form.appendChild(input);
  form.appendChild(submit);
  form.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      (e.target.tagName === "INPUT" &&
        e.target.type !== "search" &&
        document.getElementById("search").value !== "") ||
      e.Keycode == 13
    ) {
      const search = document.getElementById("search");
      getdata(search.value);
    }
  });
  document.body.appendChild(form);
  getdata("london");
}

document.body.appendChild(Header());
debugger;
document.body.appendChild(console.log(icon.svg));
DisplayWeather();
