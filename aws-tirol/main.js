// initialieren der Karte

let karte = L.map("map");
console.log(karte);

// auf Ausschnitt zoomen
//karte.setView(
//[47,, 11], 13
//);


const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),

    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
    }),

    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
    }),

    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
    }),

    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
    }),

    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
    }),

    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
    }),

    bmapoberfläche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href:="https://www.basemap.at"> basemap.at</a>'
    }),

    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),

    stamen_relief: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),

    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }),

};

kartenLayer.bmaphidpi.addTo(karte);

//Auswahlmenü hinzufügen

const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "OpenStreetMap": kartenLayer.osm,
    "Basemap HIdpi": kartenLayer.bmaphidpi,
    "Basemap Gelände": kartenLayer.bmapgelaende,
    "Basemap Oberfläche": kartenLayer.bmapoberfläche,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Watercolor": kartenLayer.stamen_watercolor,
    "Stamen Relief": kartenLayer.stamen_relief
}).addTo(karte)

karte.setView(
    [47.267222, 11.392778], 15);

async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations");
    const stations = await response.json();
    const awsTirol = L.featureGroup();
    L.geoJson(stations)
        .bindPopup(function (layer) {
            //  console.log("Layer",layer);
            const date = new Date(layer.feature.properties.date);
            console.log(`Datum: `, date);
            return `<h4>${layer.feature.properties.name}</h4>
    Temperatur: ${layer.feature.properties.LT} °C<br>
    HS: ${layer.feature.properties.HS} <br>
    HSD24: ${layer.feature.properties.HSD24} <br>
    HSD48: ${layer.feature.properties.HSD48} <br>
    HSD72: ${layer.feature.properties.HSD72} <br>
    Windgeschwindigkeit (km/h): 
    ${layer.feature.properties.WG ? layer.feature.properties.WG : `Keine Daten`}<br>
    Höhe: ${layer.feature.geometry.coordinates[2]} <br>
    Datum: ${date.toLocaleDateString("de-AT")} 
    ${date.toLocaleTimeString("de-AT")}
    <hr>
    <footer>Land Tirol - <a>"href=https://data.tirol.gv.at"> data.tirol.gv.at</a></footer>`;

        })
        .addTo(awsTirol);
    awsTirol.addTo(karte);
    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");

    const windLayer = L.featureGroup();
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = `black`;
                if (feature.properties.WG > 20) {
                    color = `red`;
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style="color:${color}; transform: rotate(${feature.properties.WR}deg)" class= "fas fa-arrow-circle-up fa-2x"></i>`
                    })
                })
            }
        }
    }).addTo(windLayer);
    layerControl.addOverlay(windLayer, "Windrichtung");
    windLayer.addTo(karte);

    const temperaturLayer = L.featureGroup();
    const farbPalette = [
        [0, "blue"],
        [1, "yellow"],
        [5, "orange"],
        [10, "red"],
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.LT) {
                let color = `red`
                for (let i = 0; i < farbPalette.length; i++) {
                    console.log(farbPalette[i], feature.properties.LT);
                    if (feature.properties.LT < farbPalette[i][0]) {
                        color = farbPalette[i][1];
                        break;
                    }
                }
                //let color = `blue`;
               // if (feature.properties.LT > 0) {
               //     color = `red`;
               // }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="temperaturLabel" style= "background-color:${color}"> ${feature.properties.LT}</div>`
                    })
                })
            }
        }
    }).addTo(temperaturLayer);
    layerControl.addOverlay(temperaturLayer, "Temperatur");
    temperaturLayer.addTo(karte);
}
//   console.log(AWS)


loadStations();