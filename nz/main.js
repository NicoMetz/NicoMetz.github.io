const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

console.log("breite:", breite, "länge:", laenge, "Titel:", titel);
let karte = L.map("map");
karte.setView(
  [breite, laenge], 10
);
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

let pin = L.marker(
  [breite, laenge]
).addTo(karte);
pin.bindPopup(titel).openPopup();