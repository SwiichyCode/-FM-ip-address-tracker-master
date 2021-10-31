/*Your challenge is to build out this IP Address Tracker app and get it looking as close to the design as possible. 
To get the IP Address locations, you'll be using the [IP Geolocation API by IPify](https://geo.ipify.org/). 
To generate the map, we recommend using [LeafletJS](https://leafletjs.com/).*/
//88.121.111.97
const headerInformation = document.querySelector(".header-information");

btnSearch.addEventListener("click", async () => {
  await fetchLocation();
  await userDisplay();
  await myMap();
  headerInformation.style.display = "flex";
  findIp.value = "";
});

let userData = [];
let latitude = "";
let longitude = "";

const fetchUser = async () => {
  const findIp = document.getElementById("findIp").value;

  await fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_BfX6cUPn4TyiLYDXhWFYiF1xmLeg2&ipAddress=${findIp}`
  )
    .then((res) => res.json())
    .then((data) => (userData = data));

  console.log(userData);
};

const fetchLocation = async () => {
  const findIp = document.getElementById("findIp").value;

  await fetch(`http://ip-api.com/json/${findIp}`)
    .then((res) => res.json())
    .then((data) => {
      latitude = data.lat;
      longitude = data.lon;
    });
};

console.log(latitude);

const userDisplay = async () => {
  await fetchUser();

  headerInformation.innerHTML = `
    <div class="header-information__ip header-information-content">
        <h3>ip address</h3>
        <span>${userData.ip}</span>
    </div>
    <div class="header-information__location header-information-content">
        <h3>location</h3>
        <span>${userData.location.region}</span>
    </div>
    <div class="header-information__timezone header-information-content">
        <h3>timezone</h3>
        <span>${userData.location.timezone}</span>
    </div>
    <div class="header-information__isp header-information-content">
        <h3>isp</h3>
        <span>${userData.isp}</span>
    </div>
    `;
};

const myMap = async () => {
  await fetchLocation();
  var mymap = L.map("map").setView([latitude, longitude], 10);
  console.log(latitude, longitude);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1Ijoic3dpaWNoeWNvZGUiLCJhIjoiY2t2ZTQxMng2MTFvdjJxbzhzZnF1YnNpYSJ9.bFXSWqTiyB8I0TkrQFNL0w ",
    }
  ).addTo(mymap);
};
