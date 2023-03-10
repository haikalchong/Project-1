const API_BASE_URL = "https://api.foursquare.com/v3/places/";

let pokemonStore = JSON.parse(localStorage.getItem("pokedex"));

if (pokemonStore) {
    for (let i of pokemonStore) {
        createPokemonCard(i.id, i.name, i.img, i.moves, i.cp)
    }
} else {
    pokemonStore = [];
}

//Map Icons

let ballIcon = L.icon({
    iconUrl: 'pokeball.png',
    iconSize: [38, 55],
    iconAnchor: [22, 94],
    popupAnchor: [0, 0]
});

let generalMarker = L.icon({
    iconUrl: 'foodlogo.png',
    iconSize: [45, 50],
    iconAnchor: [22, 94],
    popupAnchor: [0, 0]
});

let avatarMarker = L.icon({
    iconUrl: 'avatar.png',
    iconSize: [45, 50],
    iconAnchor: [22, 94],
    popupAnchor: [0, 0]
});

let locationMarker = L.icon({
    iconUrl: 'location.png',
    iconSize: [45, 50],
    iconAnchor: [22, 94],
    popupAnchor: [0, 0]
})
const sunIcon = L.icon({
    iconUrl: 'clear-sky.png',
    iconSize: [45, 45],
    iconAnchor: [23, 45],
    popupAnchor: [0, 0]
})

const windIcon = L.icon({
    iconUrl: 'wind.png',
    iconSize: [45, 45],
    iconAnchor: [23, 45],
    popupAnchor: [0, 0]
})


const cloudIcon = L.icon({
    iconUrl: 'cloud.png',
    iconSize: [45, 45],
    iconAnchor: [23, 45],
    popupAnchor: [0, 0]
})

const rainIcon = L.icon({
    iconUrl: 'raining.png',
    iconSize: [45, 45],
    iconAnchor: [23, 45],
    popupAnchor: [0, 0]
})

const thunderIcon = L.icon({
    iconUrl: 'thunderstorm.png',
    iconSize: [45, 45],
    iconAnchor: [23, 45],
    popupAnchor: [0, 0]
})


// for map 
const singapore = [1.3521, 103.8198]
const accessTokenOne = "MJUzfOEpH1UHQFI8J2srmQ0g1WOuaiuOFyUKAT8n7hVn5vd9L7nCEtSaUybOaZHQ"
let map = L.map("map")
map.setView(singapore, 12)


L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 22,
    accessToken: accessTokenOne
}).addTo(map);

//which pokemon generation
let pokemonGen = document.querySelector("#pokemonGenSelect").value

function changePokemonGen() {
    pokemonGen = document.querySelector("#pokemonGenSelect").value
    pokeLayer.clearLayers()
    randomPost()
}

async function getPokemon() {
    let min = 1
    let max = 1
    if (pokemonGen == "genOne") {
        min = 1
        max = 151
    }
    else if (pokemonGen == "genTwo") {
        min = 152
        max = 251
    }
    else if (pokemonGen == "genThree") {
        min = 252
        max = 386
    }
    else {
        min = 387
        max = 493
    }
    let pokemon = Math.floor(Math.random() * (max - min + 1) + min);
    let randomPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    return randomPokemon.data

}

//generate multiple pokemon at once
async function multiplePokemon() {
    for (i = 0; i < 5; i++) {
        let pokemonName = await getPokemon()
        return pokemonName.data
    }
}

let pokeLayer = L.layerGroup()
let searchResultCluster = L.markerClusterGroup()
let positionCluster = L.markerClusterGroup()

//generate random marker

async function marker(pokemon) {

    for (i of pokemon) {
        let lat = i.LATITUDE
        let long = i.LONGITUDE

        let pokemonLoc = L.marker([lat, long], { icon: ballIcon }).addTo(pokeLayer)
        pokeLayer.addTo(map)

        let pokeData = await getPokemon()

        let pokemonCard = document.createElement("div");
        pokemonCard.className = "card pokeCard"
        pokemonCard.style = "width:100%; height 100%; background-color:black;  font-family: 'Inconsolata', monospace"

        let cardImg = document.createElement("img")
        cardImg.src = `${pokeData.sprites.front_shiny}`
        cardImg.style = "width:100px"
        cardImg.className = "cardImg"
        pokemonCard.appendChild(cardImg)

        let cardContent = document.createElement("div")
        cardContent.className = "card-body pokeCard";

        let cardParagraph = document.createElement("p")
        cardParagraph.className = "card-body pokeCard"

        let cardHeader = document.createElement("h5")
        cardHeader.className = "card-title"
        cardHeader.innerHTML = `${pokeData.name}`
        cardHeader.style = "color:white;"
        cardParagraph.appendChild(cardHeader)

        let cardList = document.createElement("ul")
        cardList.style = "color:white;"

        let cardListNumber = document.createElement("li")
        cardListNumber.style = "color:white;"
        cardListNumber.innerHTML = `ID: "${pokeData.id}"`
        cardList.appendChild(cardListNumber)
        let cardListType = document.createElement("li");
        cardListType.style = "color:white;"
        cardListType.innerHTML = `Type: ${pokeData.types[0].type.name}`
        cardList.appendChild(cardListType)

        let cardListWeight = document.createElement("li")
        cardListWeight.style = "color:white;"
        cardListWeight.innerHTML = `Weight: ${pokeData.weight} lbs`
        cardList.appendChild(cardListWeight)

        cardParagraph.appendChild(cardList)
        cardContent.appendChild(cardParagraph)
        pokemonCard.appendChild(cardContent)

        let captureButton = document.createElement("button")
        captureButton.className = "btn btn-primary pokeCapture"
        captureButton.innerText = "Capture"
        captureButton.addEventListener("click", function () {

            //creating the pokemon data

            let min = 10
            let max = 1000
            let pokemonCombatPower = Math.floor(Math.random() * (max - min + 1) + min)
            let pokemonDataImg = pokeData.sprites.other.dream_world.front_default;
            let pokemonDataName = pokeData.name;
            let pokemonDataId = pokeData.id;
            let pokemonDataMoves = pokeData.moves;
            let cp = pokemonCombatPower
            console.log(cp)

            let pokemonMovesArray = [];

            for (let i = 0; i < 4; i++) {
                let move = pokemonDataMoves[i].move.name;
                pokemonMovesArray.push(move);
            }
            createPokemonCard(pokemonDataId, pokemonDataName, pokemonDataImg, pokemonMovesArray, cp);
            let pokemonData = {
                "id": pokemonDataId,
                "name": pokemonDataName,
                "img": pokemonDataImg,
                "moves": pokemonMovesArray,
                "cp": cp

            }

            pokemonStore.push(pokemonData)
            localStorage.setItem("pokedex", JSON.stringify(pokemonStore));
            pokemonLoc.remove()
        })
        pokemonCard.appendChild(captureButton)
        pokemonLoc.bindPopup(pokemonCard)
    }
}
//create pokemon card here
function createPokemonCard(pokeId, pokeName, pokeImg, pokeMoves, cp) {

    let pokedexData = document.createElement("div");
    pokedexData.className = "pokedexMain";
    pokedexData.style = "background-image:url('star.jpg');"

    let pokedexCard = document.createElement("div")
    pokedexCard.className = "pokemonCard"

    let pokedexImage = document.createElement("img")
    pokedexImage.className = "cardImg"
    pokedexImage.src = `${pokeImg}`
    pokedexCard.appendChild(pokedexImage)


    let pokedexName = document.createElement("h2");
    pokedexName.innerHTML = `${pokeName}`;
    pokedexCard.appendChild(pokedexName);

    let pokedexId = document.createElement("h4");
    pokedexId.innerHTML = `ID: ${pokeId}`;
    pokedexCard.appendChild(pokedexId);

    let pokecp = document.createElement('p')
    pokecp.className = 'pokeCp'

    if (cp < 500) {
        pokecp.innerHTML = `Combat Power :${cp} Grade: ???`;
        pokecp.style = 'color:PaleGreen;'
        pokedexCard.appendChild(pokecp)
    } else if (cp >= 501 && cp < 850) {
        pokecp.innerHTML = `Combat Power : ${cp} Grade: ??????`
        pokecp.style = 'color:DodgerBlue;'
        pokedexCard.appendChild(pokecp)
    } else if (cp >= 850 && cp < 950) {
        pokecp.innerHTML = `Combat Power : ${cp} Grade: ?????????`
        pokecp.style = 'color: Fuchsia; '
        pokedexCard.appendChild(pokecp)
    } else if (cp >= 950 && cp < 1000) {
        pokecp.innerHTML = `Combat Power : ${cp} Grade: ????????????`
        pokecp.style = 'color:GoldenRod;'
        pokedexCard.appendChild(pokecp)
    }

    let pokemonMoves = document.createElement("ul");
    pokemonMoves.className = "pokeMoves "

    for (let i of pokeMoves) {
        let moveElement = document.createElement("li")
        moveElement.className = "list-group-item pokemonSkill"
        moveElement.innerHTML = `Skill: ${i}`
        pokemonMoves.appendChild(moveElement)
    }

    pokedexCard.appendChild(pokemonMoves);
    pokedexData.appendChild(pokedexCard);

    document.querySelector("#pokedex").appendChild(pokedexData)

}
//search position
async function searchPosition() {
    let searchLocation = document.querySelector("#searchValue").value;
    let result = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${searchLocation}&returnGeom=Y&getAddrDetails=Y`)
    return result.data
}

// marker(pokemonCoords)
async function randomPost() {
    let postalArray = []
    while (postalArray.length < 10) {
        let randomData = Math.floor((Math.random() * 10))
        let min = 1
        let max = 516
        let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        let randomCoords = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=bus%20stop&returnGeom=Y&getAddrDetails=Y&pageNum=${randomNumber}`)
        postalArray.push(randomCoords.data.results[randomData])
    }

    marker(postalArray)
    weather()



}
setInterval(function () {
    pokeLayer.clearLayers()
    randomPost();
}, 10000)

// four square add on
const fourSquareKey = "fsq3JrEqE31l1oSQP3kdQjP7B/tDogA6mWBfGxVi+3mBKl8=";
async function searchData(query, currentL) {
    let response = await axios.get("https://api.foursquare.com/v3/places/search", {
        "headers": {
            "Accept": "application/json",
            "Authorization": fourSquareKey
        },
        "params": {

            "query": query,
            "ll": currentL,
            "radius": 5000,
            "categories": 13000,
            "limit": 10

        }
    })

    return response.data
}


let searchResultLayer = L.layerGroup()

document.querySelector("#searchBtn").addEventListener("click", async function () {

    //geolocation
    let currentL = ""
    map.locate({ maxZoom: 16 });
    function onLocationFound(e) {
        currentL = e.latitude + "," + e.longitude
        L.marker(e.latlng, { icon: avatarMarker }).addTo(map)
    };

    map.on('locationfound', onLocationFound);
    let searchFood = document.querySelector('#food').checked

    if (searchFood == true) {
        searchResultCluster.clearLayers()
        positionCluster.clearLayers()

        let searchValue = document.querySelector("#searchValue").value;
        let searchResults = await searchData(searchValue, currentL);

        for (let result of searchResults.results) {

            let coordinate = [result.geocodes.main.latitude, result.geocodes.main.longitude];
            let searchMarker = L.marker(coordinate, { icon: generalMarker }).addTo(searchResultCluster);
            searchMarker.bindPopup(`<div>
        <h3 style= " font-family: 'Inconsolata', monospace">${result.name}</h3><p style= " font-family: 'Inconsolata', monospace">
        ${result.location.formatted_address}</p></div>`)
        }
        searchResultCluster.addTo(map)
    }
    else {
        positionCluster.clearLayers()
        searchResultCluster.clearLayers()
        let result = await searchPosition(searchValue);
        for (position of result.results) {
            let coordinates = ([position.LATITUDE, position.LONGITUDE])
            let positionMarker = L.marker(coordinates, { icon: locationMarker }).addTo(positionCluster)
            positionMarker.bindPopup(`<div style= " font-family: 'Inconsolata', monospace"> <h6>${position.BUILDING}</h6>
        <p>${position.ADDRESS}</p>`)

        }
        positionCluster.addTo(map)
    }
});

let pokedexData = []
randomPost()
// add weather api
let weatherLayer = L.layerGroup()
const weatherApi = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast'
let weatherArray = []

async function weather() {
    let response = await axios.get(weatherApi)
    console.log(response)
    let weatherArea = response.data.area_metadata;

    for (let weather of response.data.items[0].forecasts) {
        weatherArray.push(weather)
    }
    for (let i = 0; i < weatherArray.length; i++) {
        weatherArea[i].forecast = weatherArray[i]
    }
    for (let loc of weatherArea) {
        let lat = loc.label_location.latitude;
        let lng = loc.label_location.longitude;
        if (loc.forecast.forecast == "Cloudy" || loc.forecast.forecast == 'Partly Cloudy (Day)' || loc.forecast.forecast == 'Partly Cloudy (Night)') {
            L.marker([lat, lng], { icon: cloudIcon }).bindPopup(`<div class="weatherLoc" style= " font-family: 'Inconsolata', monospace"><h6> ${loc.name}</h6><p>${loc.forecast.forecast}</p></div>`).addTo(weatherLayer)
        }
        if (loc.forecast.forecast == "Fair & Warm" || loc.forecast.forecast == 'Fair(Day)' || loc.forecast.forecast == 'Fair(Night)') {
            L.marker([lat, lng], { icon: sunIcon }).bindPopup(`<div class="weatherLoc" style= " font-family: 'Inconsolata', monospace"><h6> ${loc.name}</h6><p>${loc.forecast.forecast}</p></div>`).addTo(weatherLayer)
        }
        if (loc.forecast.forecast == 'Light Showers' || loc.forecast.forecast == 'Showers' || loc.forecast.forecast == 'Moderate Rain' || loc.forecast.forecast == 'Light Rain') {
            L.marker([lat, lng], { icon: rainIcon }).bindPopup(`<div class="weatherLoc" style= " font-family: 'Inconsolata', monospace"><h6> ${loc.name}</h6><p>${loc.forecast.forecast}</p></div>`).addTo(weatherLayer)
        }
        if (loc.forecast.forecast == 'Thundery Showers' || loc.forecast.forecast == 'Heavy Thundery Showers' || loc.forecast.forecast == ' Heavy Thundery Showers with Gusty Winds') {
            L.marker([lat, lng], { icon: thunderIcon }).bindPopup(`<div class="weatherLoc" style= " font-family: 'Inconsolata', monospace"><h6> ${loc.name}</h6><p>${loc.forecast.forecast}</p></div>`).addTo(weatherLayer)
        }
        weatherLayer.addTo(map)
    }

}
let baseLayers = {
};

let overlays = {
    'Weather': weatherLayer
}
L.control.layers(baseLayers, overlays).addTo(map);

document.querySelector("#pokedexClearBtn").addEventListener("click", () => {
    localStorage.clear();
    document.getElementById("pokedex").innerHTML = `<h2 class="pokedexTitle">My Pokedex</h2>`;

});



document.querySelector("#submit").addEventListener('click',function(){
    let email = document.querySelector("#email").value
    if(!email || email.includes("@")==false){
        alert("Please key in a valid email")
    }else{
        alert("Email received")
    }
})