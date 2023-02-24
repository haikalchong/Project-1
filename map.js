// let pokedexData;



const API_BASE_URL = "https://api.foursquare.com/v3/places/";




// for pokemon to generate random pokemon

let ballIcon = L.icon({
    iconUrl: 'pokeball.png',

    iconSize: [38, 55],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

let generalMarker = L.icon({
    iconUrl: 'foodlogo.png',

    iconSize: [45, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

let avatarMarker = L.icon({
    iconUrl: 'avatar.png',
    iconSize: [45, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});


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
let pokemonGen=document.querySelector("#pokemonGenSelect").value

function changePokemonGen(){
    pokemonGen=document.querySelector("#pokemonGenSelect").value
    console.log(pokemonGen)
    pokeLayer.clearLayers()
    randomPost()
}




async function getPokemon() {
    let min=1
    let max=1
    if(pokemonGen=="genOne"){
        min=1
        max=151
    }
    else if(pokemonGen=="genTwo"){
        min = 152
        max=251
    }
    else if(pokemonGen=="genThree"){
        min= 252
        max=386
    }
    else{
        min= 387
        max= 493
    }
    let pokemon =  Math.floor(Math.random() * (max - min + 1) + min);
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


//generate random marker

async function marker(pokemon) {

    // let randomMarker= await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${markerCoords}&returnGeom=Y&getAddrDetails=Y`)
    for (i of pokemon) {
        let lat = i.LATITUDE
        let long = i.LONGITUDE


        let pokemonLoc = L.marker([lat, long], { icon: ballIcon }).addTo(pokeLayer)
        pokeLayer.addTo(map)


        let pokeData = await getPokemon()
        let pokemonCard = document.createElement("div");
        pokemonCard.className = "card"
        pokemonCard.style = "width:100%; height 100%; background-color:black;"

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
        cardListNumber.innerHTML = `"${pokeData.id}"`
        cardList.appendChild(cardListNumber)
        let cardListType = document.createElement("li");
        cardListType.style = "color:white;"
        cardListType.innerHTML = `${pokeData.types[0].type.name}`
        cardList.appendChild(cardListType)

        let cardListWeight = document.createElement("li")
        cardListWeight.style = "color:white;"
        cardListWeight.innerHTML = `${pokeData.weight}`
        cardList.appendChild(cardListWeight)

        cardParagraph.appendChild(cardList)
        cardContent.appendChild(cardParagraph)
        pokemonCard.appendChild(cardContent)








        let captureButton = document.createElement("button")
        captureButton.className = "btn btn-primary pokeCapture"
        captureButton.innerText = "Capture"
        captureButton.addEventListener("click", function () {
            let none = document.querySelector(".pokedexNone")
            if (none) {
                none.innerHTML = ""
            }


            //creating the pokemon data

            let pokedexData = document.createElement("div");
            pokedexData.className = "container row"


            let pokedexCard = document.createElement("div")


            let pokedexImage = document.createElement("img")
            pokedexImage.className = "cardImg pokedexImg"
            pokedexImage.src = `${pokeData.sprites.other.dream_world.front_default}`
            pokedexCard.appendChild(pokedexImage)
            let pokedexName = document.createElement("h2");
            pokedexName.innerHTML = `${pokeData.name}`
            pokedexCard.appendChild(pokedexName);

            let pokemonMoves = document.createElement("ul");
            pokemonMoves.className = "list-group "
            
            let pokemonMovesArray=pokeData.moves

            for (let i = 0; i<4; i++){
                let moveElement=document.createElement("li")
                moveElement.className="list-group-item"
                moveElement.innerHTML= `Skill:${pokemonMovesArray[i].move.name}`
                pokemonMoves.appendChild(moveElement)
            }

            // let pokemonMoveOne = document.createElement("li");
            // pokemonMoveOne.className = "list-group-item"
            // pokemonMoveOne.innerHTML = `Skill: ${pokeData.moves[0].move.name}`
            // pokemonMoves.appendChild(pokemonMoveOne);

            // let pokemonMoveTwo = document.createElement("li");
            // pokemonMoveTwo.className = "list-group-item"
            // pokemonMoveTwo.innerHTML = `Skill: ${pokeData.moves[1].move.name}`
            // pokemonMoves.appendChild(pokemonMoveTwo);

            // let pokemonMoveThree = document.createElement("li");
            // pokemonMoveThree.className = "list-group-item"
            // pokemonMoveThree.innerHTML = `Skill: ${pokeData.moves[2].move.name}`
            // pokemonMoves.appendChild(pokemonMoveTwo);

            // let pokemonMoveFour = document.createElement("li");
            // pokemonMoveFour.className = "list-group-item"
            // pokemonMoveFour.innerHTML = `Skill: ${pokeData.moves[3].move.name}`
            // pokemonMoves.appendChild(pokemonMoveFour);

            // let pokemonMoveFive = document.createElement("li");
            // pokemonMoveFive.className = "list-group-item"

            // pokemonMoveFive.innerHTML = `Skill: ${pokeData.moves[4].move.name}`
            // pokemonMoves.appendChild(pokemonMoveFive);
            pokedexCard.appendChild(pokemonMoves);
            pokedexData.appendChild(pokedexCard);







            document.querySelector("#pokedex").appendChild(pokedexData)
            pokemonLoc.remove()
        })
        pokemonCard.appendChild(captureButton)

        pokemonLoc.bindPopup(pokemonCard)





        //     pokemonLoc.bindPopup(`<div class="card" style="width:100%; height:100%; background-color:black;">
        //     <img src="${pokeData.sprites.front_shiny}" width="100px !important" class="cardImg" alt="${pokeData.name}"/>
        //       <div class="card-body pokeCard" >
        //        <h5 class="card-title" style="color:white;">${pokeData.name}</h5>
        //       <p class="card-text">
        //      <ul style="color:white;">
        //       <li style="color:white;">Pokemon ID: ${pokeData.id}</li>
        //         <li style="color:white;">Type: ${pokeData.types[0].type.name}</li>
        //        <li style="color:white;">Weight: ${pokeData.weight}</li>
        //        </ul>
        //     </p>
        //        <button class="btn btn-primary pokeCapture" id="pokemonBtn" data-name="${pokeData.name}" data-id="${pokeData.id} data-img="${pokeData.sprites.front_shiny}">Capture</button>
        //       </div>
        //    </div>`)




    }



    // $(document.body).on('click', '.pokeCapture', function () {
    //     let pokeId = $(this).attr("data-id");
    //     let pokeName = $(this).attr("data-name");
    //     let pokeImg = $(this).attr("data-img");



    //     //  let newPokemon={
    //     //      "id":pokeId,
    //     //      "name":pokeName,
    //     //      "image": pokeImg
    //     //  }
    //     alert(`"congratulations you caught ${pokeName}"`)
    //     pokeLayer.clearLayers()
    //     randomPost()
    //     //     pokedexData.push(newPokemon.id, newPokemon.name)
    //     //    displayPokedex()



}




// marker(pokemonCoords)
async function randomPost() {
    let postalArray = []
    while (postalArray.length < 10) {
        let randomData=Math.floor((Math.random()*10))
        let min = 1
        let max = 516
        let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        let randomCoords = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=bus%20stop&returnGeom=Y&getAddrDetails=Y&pageNum=${randomNumber}`)
        postalArray.push(randomCoords.data.results[randomData])




        
    }

    marker(postalArray)

}
//  setInterval(function () {
//      pokeLayer.clearLayers()
//      randomPost();
//  }, 10000)

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
    // let searchValue = document.querySelector("#searchValue").value;
    // let searchResults = await searchData(searchValue);
    searchResultLayer.clearLayers();

    //geolocation
    let currentL = ""
    map.locate({ maxZoom: 16 });
    function onLocationFound(e) {
        // var radius = e.accuracy;
        currentL += e.latlng.lat + "," + e.latlng.lng


        L.marker(e.latlng, { icon: avatarMarker }).addTo(map)
        //  .bindPopup("You are within " + radius + " meters from this point").openPopup();

        //  L.circle(e.latlng, radius).addTo(map);

    }

    map.on('locationfound', onLocationFound);

    let searchValue = document.querySelector("#searchValue").value;
    let searchResults = await searchData(searchValue, currentL);

    for (let result of searchResults.results) {

        let coordinate = [result.geocodes.main.latitude, result.geocodes.main.longitude];
        let searchMarker = L.marker(coordinate, { icon: generalMarker }).addTo(searchResultLayer);


        searchMarker.bindPopup(`<div>
        <h3>${result.name}</h3><p>
        ${result.location.formatted_address}</p></div>`)
    }
    searchResultLayer.addTo(map)



});

let pokedexData = []

randomPost()

// $(document.body).on('click', '.pokeCapture', function () {
//     let pokeId = $(this).attr("data-id");
//     let pokeName = $(this).attr("data-name");
//     let pokeImg = $(this).attr("data-img");



//     //  let newPokemon={
//     //      "id":pokeId,
//     //      "name":pokeName,
//     //      "image": pokeImg
//     //  }
//     alert(`"congratulations you caught ${pokeName}"`)
//     pokeLayer.clearLayers()
//     randomPost()
//     //     pokedexData.push(newPokemon.id, newPokemon.name)
//     //    displayPokedex()


// })
function displayPokedex() {
    let pokedex = document.querySelector("#pokedex")
    for (i of pokedexData) {
        document.createElement("div")
        let newData = document.createTextNode(i)
        pokedex.appendChild(newData)

    }

}







