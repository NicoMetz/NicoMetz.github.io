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
    subdomains: ["a","b","c"],
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),

geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",{
  subdomains:["maps","maps1","maps2","maps3", "maps4"],
  attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
}),
  
bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857{z}/{y}/{x}.png",{
  subdomains:["maps","maps1","maps2","maps3", "maps4"],
  attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
}),
  
bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",{
  subdomains:["maps","maps1","maps2","maps3", "maps4"],
  attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
}),

bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg",{
  subdomains:["maps","maps1","maps2","maps3", "maps4"],
  attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
}),

bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",{
  subdomains:["maps","maps1","maps2","maps3", "maps4"],
  attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
}),  
  
bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg",{
  subdomains:["maps","maps1","maps2","maps3", "maps4"],
  attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
}),  

bmapoberfläche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg",{
  subdomains:["maps","maps1","maps2","maps3", "maps4"],
  attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
}),  

stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",{
subdomains:["a","b","c"],
attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}),

stamen_relief: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",{
  subdomains:["a","b","c"],
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  }),

  stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",{
    subdomains:["a","b","c"],
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }),

};

kartenLayer.bmaphidpi.addTo(karte);

//Auswahlmenü hinzufügen

L.control.layers({
"Geoland Basemap": kartenLayer.geolandbasemap,
"Geoland Basemap Grau": kartenLayer.bmapgrau,
"OpenStreetMap":kartenLayer.osm,
"Basemap HIdpi": kartenLayer.bmaphidpi,
"Basemap Gelände": kartenLayer.bmapgelaende,
"Basemap Oberfläche":kartenLayer.bmapoberfläche,
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


let blickeGruppe = L.featureGroup().addTo(karte);

for (let blick of ADLERBLICKE) {
  let blickpin = L.marker(
    [blick.lat, blick.lng]
  ).addTo(blickeGruppe);
  blickpin.bindPopup(
    `<h1> Standort ${blick.standort}</h1>
        <p> Höhe: ${blick.seehoehe}<p>
        <em>Kunde: ${blick.kunde}<p>`
  )
};
console.log(blickeGruppe.getBounds())
karte.fitBounds(blickeGruppe.getBounds())
