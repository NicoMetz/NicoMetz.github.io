const div = document.getElementById("map");
const breite = div.getAttribute("data-lat1");
const laenge = div.getAttribute("data-lng1");
const titel = div.getAttribute("data-title");


console.log("breite:", breite, "länge:", laenge, "Titel:", titel);

// initialieren der Karte

let karte = L.map("map");
//console.log(karte);

// auf Ausschnitt zoomen
karte.setView(
  [breite, laenge], 13
);


const kartenLayer = {
  osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
  }),

  NZ_TOPO_50: L.tileLayer("https://{s}.data-cdn.linz.govt.nz/services;key=d64fa727f2214c36904e98c1970c6b8b/tiles/v4/layer=50767,style=auto/EPSG:3857/{z}/{x}/{y}.png", {
    subdomains: ["tiles-a", "tiles-b", "tiles-c", "tiles-d"],
    attribution: 'data.linz.govt.nz - Attribution 4.0 International (CC BY 4.0) '
  }),

  NZ_Arial: L.tileLayer("https://{s}.data-cdn.linz.govt.nz/services;key=d64fa727f2214c36904e98c1970c6b8b/tiles/v4/set=4702,style=auto/EPSG:3857/{z}/{x}/{y}.png", {
    subdomains: ["tiles-a", "tiles-b", "tiles-c", "tiles-d"],
    attribution: 'data.linz.govt.nz - Attribution 4.0 International (CC BY 4.0) '
  }),

  stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
  }),

  stamen_relief: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
  }),

  stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
  })

};

kartenLayer.bmaphidpi.addTo(karte);

//Auswahlmenü hinzufügen

L.control.layers({
  "OpenStreetMap": kartenLayer.osm,
  "NZ_TOPO_50": kartenLayer.NZ_TOPO_50,
  "NZ_Arial": kartenLayer.NZ_Arial,
  "Stamen Toner": kartenLayer.stamen_toner,
  "Stamen Watercolor": kartenLayer.stamen_watercolor,
  "Stamen Relief": kartenLayer.stamen_relief
}).addTo(karte)


//Positionsmarker Hinzufügen
let pin = L.marker(
  [breite, laenge]
).addTo(karte);

//popup an Pin setzten
pin.bindPopup(titel).openPopup();


let mapGruppe = L.featureGroup().addTo(karte);

for (let blick of SIGHTS) {
  let blickpin = L.marker(
    [blick.lat, blick.lng]
  ).addTo(mapGruppe);
  blickpin.bindPopup(
    `<h1> Village ${blick.ort}</h1>`
  )
};
console.log(mapGruppe.getBounds())
karte.fitBounds(mapGruppe.getBounds())


karte.addControl(new L.Control.Fullscreen());
var hash = new L.Hash(karte);
var coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function (e) {
  coords.setCoordinates(e);
});