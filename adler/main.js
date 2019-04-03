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

//Openstreetmap einbinden

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
subdomains: ["a","b","c"],
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(karte);

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