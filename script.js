
window.addEventListener('DOMContentLoaded', (event) => {
    // Замените 'YOUR_API_KEY' на ваш собственный API-ключ OpenWeatherMap
    const apiKey = 'eb7442a00fd22da3c0348c36126855a9'; // √

    // Замените 'CITY_NAME' на название города, для которого вы хотите получить прогноз погоды
    let weatherForecast = document.querySelector(".weather-forecast");
    let currentTemperatute = document.querySelector(".current-temperature");
    let minTemperatute = document.querySelector(".min-temperature");
    let maxTemperatute = document.querySelector(".max-temperature");
    let feelsLikeTemperatute = document.querySelector(".feels-temperature");
    let sunrise = document.querySelector(".sunrise");
    let sunset = document.querySelector(".sunset");
    let currentTime = document.querySelector(".curent-time");

    let weekWeather = document.querySelector(".weather-week-forecast");
    let template = document.querySelector("#weather-info-template").innerHTML;
    let city;
    let cityInput = document.querySelector(".city-name");

    cityInput.addEventListener("change", (event) => {
        city = cityInput.value;
        console.log(city);

        // // Формируем URL для запроса к API OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const fiveDaysUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        // Отправляем GET-запрос к API
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const minimumTemperature = data.main.temp_min;
                const maximumTemperature = data.main.temp_max;
                const feelsTemperature = data.main.feels_like;
                const temperature = data.main.temp;
                const curTime = data.dt;

                let country = data.sys.country;

                const sunRise = data.sys.sunrise;
                const sunSet = data.sys.sunset;

                weatherForecast.innerHTML = `Прогноз для: ${country} - ${city}`;
                // === ===
                currentTemperatute.innerHTML = `Текущая температура: ${temperature}`;
                minTemperatute.innerHTML = `Минимальная температура: ${minimumTemperature}`;
                maxTemperatute.innerHTML = `Максимальная температура: ${maximumTemperature}`;
                feelsLikeTemperatute.innerHTML = `Ощущается как: ${feelsTemperature}`;
                let date = new Date(sunRise * 1000);
                sunrise.innerHTML = `Восход: ${`${date.getHours()}:${date.getMinutes()}`}`;
                date = new Date(sunSet * 1000);
                sunset.innerHTML = `Закат: ${`${date.getHours()}:${date.getMinutes()}`}`;
                time = new Date(curTime * 1000);
                currentTime.innerHTML = `Время: ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
            })
            .catch((error) => {
                console.error('Произошла ошибка:', error);
            });

        fetch(fiveDaysUrl)
            .then(response => response.json())
            .then((data) => {

                weekWeather.innerHTML = '';

                data.list.forEach((elem) => {
                    dataObj = {
                        temp: elem.main.temp,
                        humidity: elem.main.humidity,
                        pressure: elem.main.pressure,
                        weather: elem.weather[0],
                        windSpeed: elem.wind.speed,
                        dt_txt: elem.dt_txt,
                    }

                    console.log(elem.main.temp);
                    let div = Mustache.render(template, dataObj);
                    console.log(div);
                    weekWeather.insertAdjacentHTML("beforeend", `${div}`);
                });
            });
    })
});