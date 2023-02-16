




// for pokemon to generate random pokemon





// for map 
const singapore = [1.3521, 103.8198]
const accessTokenOne = "MJUzfOEpH1UHQFI8J2srmQ0g1WOuaiuOFyUKAT8n7hVn5vd9L7nCEtSaUybOaZHQ"
let map = L.map("map")
map.setView(singapore, 12)


L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 22,
    bounds: [[1.56073, 104.11475], [1.16, 103.502]],
    accessToken: accessTokenOne
}).addTo(map);

async function getPokemon() {
    let pokemon = Math.floor(Math.random() * 150) + 1
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

//to generate random postal



//generate random marker

async function marker(pokemon) {
    //let postalCode=randomPost

    // let randomMarker= await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${markerCoords}&returnGeom=Y&getAddrDetails=Y`)
    for (i of pokemon) {
        let lat = i.results[0].LATITUDE
        let long = i.results[0].LONGITUDE
        let = pokemonLoc = L.marker([lat, long]).addTo(map)
        let pokeData = await getPokemon()
        // pokemonLoc.bindPopup(`<div><h3>${pokeData.name}</h3>
        // <img src="${pokeData.sprites.front_shiny}"/>
        // <ul>
        // <li>Pokemon ID: ${pokeData.id}</li>
        // <li>Type: ${pokeData.types[0].type.name}</li>
        // <li>Weight: ${pokeData.weight}</li>
        // </ul>
        // <button>Capture</button>
        // </div>`)
        pokemonLoc.bindPopup(`<div class="card" style="width:100%; height:100%; background-color:black;">
        <img src="${pokeData.sprites.front_shiny}" width="100px !important" class="cardImg" alt="${pokeData.name}"/>
        <div class="card-body">
          <h5 class="card-title" style="color:white;">${pokeData.name}</h5>
          <p class="card-text">
          <ul style="color:white;">
          <li style="color:white;">Pokemon ID: ${pokeData.id}</li>
          <li style="color:white;">Type: ${pokeData.types[0].type.name}</li>
          <li style="color:white;">Weight: ${pokeData.weight}</li>
          </ul>
          </p>
          <button class="btn btn-primary">Capture</button>
        </div>
      </div>`)




    }
}


// marker(pokemonCoords)
async function randomPost() {
    let postalAr = []
    while (postalAr.length < 10) {
        let min = 100000
        let max = 899999
        let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        let randomCoords = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${randomNumber}&returnGeom=Y&getAddrDetails=Y`)
        if (randomCoords.data.found == 1) {
            postalAr.push(randomCoords.data)
        }

    }
    marker(postalAr)
}

setInterval(function(){
    randomPost();
}, 12000)


