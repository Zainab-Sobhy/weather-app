var cardsContent = document.querySelector(".row");
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var date = new Date();
function theDay(day) {
   return day % 7;
}
function userLocation() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function success(position) {
         try {
            var lon = position.coords.longitude;
            var lat = position.coords.latitude;
            var request = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
            var location = await request.json();
            var current = location.address.country;
            await tryData(current);
         } catch (error) {
            console.log("error");
         }
      },
         function error() {
            console.error("Geolocation failed");
         });
   } else {
      console.error("Geolocation is not supported by this browser");
   }
};
async function tryData(city) {
   try {
      var request = await fetch(` http://api.weatherapi.com/v1/forecast.json?key=d99e2ad0264941518a400917241412&q=${city}&days=3`);
      if (request.ok == false) {
         throw new Error("error");
      }
      var data = await request.json();
      cardsContent.innerHTML = `
         <div class="col-lg-4">
                    <div class="card first rounded-end-0">
                        <div class="card-header title1 border-0 d-flex justify-content-between">
                            <p class="mb-0">${days[date.getDay()]}</p>
                            <p class="mb-0">${date.getDate()} ${months[date.getMonth()]}</p>
                        </div>
                        <div class="card-body">
                            <div class="fs-5">${data.location.name}</div>
                            <div class="my-3">
                                <p class="text-white first-card-deg">${data.current.temp_c}<sup>o</sup>C</p>
                                <img src="${data.current.condition.icon}" class="w-25" alt="cloud">
                            </div>
                            <p class="weather-mode">${data.current.condition.text}</p>
                            <div class="d-flex gap-3">
                                <div>
                                    <img src="imagee/icon-umberella.png" alt="umberella">
                                    <span>20%</span>
                                </div>
                                <div>
                                    <img src="imagee/icon-wind.png" alt="wind">
                                    <span>18Km/h</span>
                                </div>
                                <div>
                                    <img src="imagee/icon-compass.png" alt="compass">
                                    <span>East</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card second rounded-0 border-0">
                        <div class="card-header title2 text-center border-0">
                            ${days[theDay(date.getDay() + 1)]}
                        </div>
                        <div class="card-body text-center mt-5">
                            <div><img src="${data.forecast.forecastday[1].day.condition.icon}" alt="sun"></div>
                            <div class="my-3 text-white">
                                <span class="fs-4 fw-bold">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup> C</span>
                                <p>${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup> C</p>
                            </div>
                            <p class="weather-mode">${data.forecast.forecastday[1].day.condition.text}</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card first rounded-start-0">
                        <div class="card-header text-center title1 border-0">
                            ${days[theDay(date.getDay() + 2)]}
                        </div>
                        <div class="card-body text-center mt-5">
                            <div><img src="${data.forecast.forecastday[2].day.condition.icon}" alt="sun"></div>
                            <div class="my-3">
                                <span class="fs-4 fw-bold text-white">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup> C</span>
                                <p>${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup> C</p>
                            </div>
                            <p class="weather-mode">${data.forecast.forecastday[2].day.condition.text}</p>
                        </div>
                    </div>
                </div>
        `
   } catch (error) {
      console.log("errro");

   }
}

userLocation();
var searchInput = document.querySelector(".search-input");
searchInput.addEventListener('keyup', function (e) {
   var inputData = (e.target.value);
   tryData(inputData);

});




