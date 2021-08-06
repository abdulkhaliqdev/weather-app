import './style.css';
import Header from './header';

const main = document.createElement("div");
main.setAttribute("id", "main");
async function getdata(location) {
  if ((typeof(document.getElementById('weather')) !== 'undefined') && (document.getElementById('weather') !== null)) {
    document.getElementById('weather').remove();
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f31d1d7e61a6d0091456d075c434ce78`;
  const respon = await fetch(url, { origin: "cors" });
  const weather = document.createElement("div");
  weather.setAttribute("id", "weather");
  weather.classList.add("weather");
  if (respon.status === 404){
    weather.innerHTML = `<h2 class='card'>Location Not Found! Enter Valid Location</h2>`;
    document.body.setAttribute("class", "unknown_location");
  }else{
    const data = await respon.json();    
    const temp = KtoC(data.main.temp);
    weather.innerHTML = `
    <div class='card'>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /><h2> ${temp}°C </h2>
    <small>${data.weather[0].main}</small>
    </div>
    `;
    if(data.weather[0].main === 'Clear'){
      document.body.setAttribute("class", "Sunny");
    }else if(data.weather[0].main === 'Clouds'){
      document.body.setAttribute("class", "Clouds");
    }else if(data.weather[0].main === 'Snow'){
      document.body.setAttribute("class", "Snow");
    }else if(data.weather[0].main === 'Rain'){
      document.body.setAttribute("class", "Rain");
    }
  }

  main.appendChild(weather);
}

function KtoC(temp) {
  return (temp - 273.15).toFixed(2);
}

function DisplayWeather(data) {
  const form = document.createElement("div");
  form.setAttribute("id", "form");
  const input = document.createElement("input");
  input.setAttribute("type", "search");
  input.setAttribute("placeholder", "search");
  input.setAttribute("id", "search");
  const submit = document.createElement("input");
  submit.setAttribute("id", "submit");
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

  main.appendChild(document.body.appendChild(form));
  getdata("london");
}

document.body.appendChild(Header());
document.body.appendChild(main);
DisplayWeather();
