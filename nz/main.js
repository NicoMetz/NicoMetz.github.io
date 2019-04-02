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

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

//Positionsmarker Hinzufügen
let pin = L.marker(
  [breite, laenge]
).addTo(karte);

//popup an Pin setzten
pin.bindPopup(titel).openPopup();


let nzGruppe=L.featureGroup().addTo(karte);

for (let nz of NSHAAST) {
  let nzpin = L.marker(
    [nz.lat, nz.lng]
  ).addTo(nzGruppe);
  nzpin.bindPopup(
    `<h1> Attraction ${nz.standort}</h1>
        <p> Lattitude: ${nz.lat}<p>
        <em>Lungitude: ${nz.lng}<p>`
  )
};
console.log(nzGruppe.getBounds())
karte.fitBounds(nzGruppe.getBounds())