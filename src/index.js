/* eslint-disable no-use-before-define */
import { remove } from 'lodash';
import './style.css';
import Header from './header';

let location = 'london';
const main = document.createElement('div');
main.setAttribute('id', 'main');

const KtoC = (temp) => (temp - 273.15).toFixed(2);
const KtoF = (temp) => ((temp - 273.15) * (9 / 5) + 32).toFixed(2);

const temperature = (toggle, temp) => {
  if (toggle === '' || toggle === 'C') {
    return KtoC(temp);
  }
  return KtoF(temp);
};

const changeBackground = (data) => {
  if (data.weather[0].main === 'Clear') {
    document.body.setAttribute('class', 'Sunny');
  } else if (data.weather[0].main === 'Clouds') {
    document.body.setAttribute('class', 'Clouds');
  } else if (data.weather[0].main === 'Snow') {
    document.body.setAttribute('class', 'Snow');
  } else if (data.weather[0].main === 'Rain') {
    document.body.setAttribute('class', 'Rain');
  }
};

const eventToggleButton = () => {
  const toggleButton = document.getElementById('toggle_button');
  toggleButton.addEventListener('click', (e) => {
    const targetDiv = e.target;
    const toggle = document.getElementById('toggle_slider');
    if (targetDiv.checked !== null && targetDiv.checked === true) {
      toggle.setAttribute('class', 'slider2');
      document.getElementById('weather').remove();
      changeData(location, 'F');
    } else {
      toggle.setAttribute('class', 'slider');
      document.getElementById('weather').remove();
      changeData(location, 'C');
    }
  });
};

const getdata = async (location, toggle = 'C') => {
  if ((typeof (document.getElementById('weather')) !== 'undefined') && (document.getElementById('weather') !== null)) {
    remove();
    document.getElementById('weather').remove();
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f31d1d7e61a6d0091456d075c434ce78`;
  const respon = await fetch(url, { origin: 'cors' });
  const weather = document.createElement('div');
  weather.setAttribute('id', 'weather');
  weather.classList.add('weather');
  if (respon.status === 404) {
    weather.innerHTML = '<h2 class=\'card\'>Location Not Found! Enter Valid Location</h2>';
    document.body.setAttribute('class', 'unknown_location');
  } else {
    const data = await respon.json();
    const temp = temperature(toggle, data.main.temp);
    const tempIcon = toggle === 'C' ? '°C' : '°F';
    weather.innerHTML = `
    <div>
      <h1> ${location}</h1>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      <h2> ${temp} ${tempIcon}</h2>
      <small>${data.weather[0].main}</small>
    </div>
    `;
    changeBackground(data);
  }
  main.appendChild(weather);
  eventToggleButton();
};

const changeData = (location, toggle) => {
  getdata(location, toggle);
};

const DisplayWeather = () => {
  const form = document.createElement('div');
  form.setAttribute('id', 'form');
  const input = document.createElement('input');
  input.setAttribute('type', 'search');
  input.setAttribute('placeholder', 'search');
  input.setAttribute('id', 'search');
  const toggle = document.createElement('div');
  toggle.setAttribute('id', 'toggle');
  toggle.innerHTML = `
  <label class="switch">
    <input type="checkbox" id='toggle_button'>
    <span class="slider" id="toggle_slider"></span>
  </label>`;

  const submit = document.createElement('input');
  submit.setAttribute('type', 'button');
  submit.setAttribute('value', 'submit');
  submit.setAttribute('id', 'submit');

  form.appendChild(input);
  form.appendChild(toggle);
  form.appendChild(submit);
  submit.addEventListener('click', (e) => {
    if (((e.target.tagName === 'INPUT' && e.target.type !== 'search' && document.getElementById('search').value !== '') || (e.target.type !== 'checkbox')) || e.Keycode === 13
    ) {
      const toggle = document.getElementById('toggle');
      const search = document.getElementById('search');
      location = search.value;
      getdata(search.value, getComputedStyle(toggle.firstElementChild.lastElementChild, '::before').content.split('"')[1].split('°')[1]);
      search.value = '';
    }
  });

  main.appendChild(document.body.appendChild(form));
  getdata('london', getComputedStyle(toggle.firstElementChild.lastElementChild, '::before').content.split('"')[1].split('°')[1]);
};

document.body.appendChild(Header());
document.body.appendChild(main);
DisplayWeather();