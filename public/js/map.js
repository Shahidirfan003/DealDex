
const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

geocode();
// Geocode function
function geocode() {
const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
fetch(url)
   .then(response => response.json())
   .then(data => {
       if (data.length > 0) {
           const lat = data[0].lat;
           const lon = data[0].lon;
           map.setView([lat, lon], 13);
           
           L.marker([lat,lon]).addTo(map)
               .bindPopup(address.replace(/["']/g, '')) //regex pattern
               .openPopup();
          } else {
            map.setView([14.456, 68.108], 13);
            L.marker([14.456, 68.108]).addTo(map)
               .bindPopup('Address Not Found!')
               .openPopup();
       }
   })
   .catch(error => {
    map.setView([14.456, 68.108], 13);
            L.marker([14.456, 68.108]).addTo(map)
               .bindPopup('Address Not Found!')
               .openPopup();
   });
}