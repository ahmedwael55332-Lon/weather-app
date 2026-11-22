var savedData = localStorage.getItem("ourdata");

if (savedData) {
    var data = JSON.parse(savedData);
    disdata();
}

async function getweatherdata(location = "Giza") {
    var res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=8dabb8ce24954bc58a5192755251709&q=${location}&days=3`, {
            method: "GET",
        }
    );

    if (res.ok) {
        data = await res.json();
        console.log(data);
        localStorage.setItem("ourdata", JSON.stringify(data));
        disdata();
    }
}

function disdata() {
    if (!data || !data.forecast) return;

    var today = data.forecast.forecastday[0];
    var second = data.forecast.forecastday[1];
    var third = data.forecast.forecastday[2];

    var alldata = `
    <div class="today col-md-4 bg-black ">
      <p class="text-center">${today.date}</p>
      <h4>${data.location.name}</h4>
      <h1 class="text-center fw-bolder">${data.current.temp_c}°C
        <img src="http:${data.current.condition.icon}" alt="">
      </h1>
      <p>${data.current.condition.text}</p>
      <div class="d-flex ">
        <i class="fa-solid fa-wind me-1"></i>
        <p class="ms-1 me-1 ">${data.current.wind_mph}%</p>
        <i class="fa-solid fa-cloud-rain me-1"></i>
        <p class="ms-2 me-1">${data.current.heatindex_f}%</p>
        <i class="fa-solid fa-umbrella me-1"></i>
        <p class="ms-2 me-1">${data.current.humidity}%</p>
      </div>
    </div>

    <div class="forecast col-md-4 bg-dark text-center">
      <p>${second.date}</p>
      <img src="http:${second.day.condition.icon}" alt="">
      <h4>${second.day.maxtemp_c}°C </h4>
      <h6>${second.day.mintemp_c}°C</h6>
      <p>${second.day.condition.text}</p>
    </div>
    
    <div class="forecast col-md-4 text-center bg-black">
      <p>${third.date}</p>
      <img src="http:${third.day.condition.icon}" alt="">
      <h4>${third.day.maxtemp_c}°C</h4>
      <h6>${third.day.mintemp_c}°C</h6>
      <p>${third.day.condition.text}</p>
    </div>
  `;

    document.getElementById("forecast").innerHTML = alldata;
}

var locationInput = document.getElementById("search");

locationInput.addEventListener("input", function() {
    getweatherdata(locationInput.value);
});

getweatherdata();