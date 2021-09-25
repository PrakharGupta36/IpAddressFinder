// const { type } = require("os");

let input = document.getElementById("input");
let submit = document.getElementById("submit");
let apiKey = "738dbd900ffae3b2ee8555785a25fa6b";
let ipAddress = input.value;
let ipAddressText = document.getElementById("ipAddressText");
let isp = document.getElementById("isp");
let locationText = document.getElementById("location");
let timezoneText = document.getElementById("timeZone");
let lat = -77.0364;
let lan = 38.8951;
console.log(lat, lan);


submit.onclick = () => {
  console.log(typeof ipAddress)
  fetch(`https://ipapi.co/${input.value}/json`)
    .then((response) => response.json())
    .then((data) => {
      ipAddressText.textContent = data.ip;
      if (data.org === null) {
        isp.textContent = "Null"
      } else {
        isp.textContent = data.org;
      }
      locationText.textContent = `${data.city} , ${data.region}, ${data.country_name}`;
      timezoneText.textContent = data.timezone;
      console.log(lat, lan);
      console.log(data);
      mapboxgl.accessToken =
        "pk.eyJ1IjoicHJha2hhcjM2IiwiYSI6ImNrdHpha296dzJ6MGkyb25xaDN3aDl6MTAifQ.xq9BFA0uvUt6MoXPD-hpSA";

      var map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [data.longitude, data.latitude], // latitude and longitude starting position
        zoom: 9,

      });
      const marker = new mapboxgl.Marker()
        .setLngLat([data.longitude, data.latitude])
        .addTo(map);
      marker = new mapboxgl.Marker({
        color: "#FF0000",
        draggable: true,
      })
        .setLngLat([data.longitude, data.latitude])
        .addTo(map);
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );
    });
};

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJha2hhcjM2IiwiYSI6ImNrdHpha296dzJ6MGkyb25xaDN3aDl6MTAifQ.xq9BFA0uvUt6MoXPD-hpSA";

var map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [lat, lan], // latitude and longitude starting position
  zoom: 9,
  renderingMode: "3d",
});

marker = new mapboxgl.Marker({
  color: "#FF0000",
  draggable: true,
})
  .setLngLat([lat, lan])
  .addTo(map);
map.addControl(new mapboxgl.NavigationControl());
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
  })
);
