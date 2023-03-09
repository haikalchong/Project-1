# Pokemon Hero
<br>

The live demo to the website can be accessed [here](https://flourishing-quokka-df4a64.netlify.app/).

*Note: This is a bootcamp project where a web application was created with interactive elements (implemented with JavaScript). Main technologies used are Bootstrap, CSS, HTML and JavaScript*

## Project Summary
 To create a map website that will improve and provide convenience to peoples lives and most importantly, to put a smile on their face.

### Project Context

Pokemon Hero is a map application that is able to search for whichever cuisine of food that you are craving that is closest to you. It also has the ability to search for places anywhere in Singapore. Be it a random HDB block or some place in Singapore that are lands unknown to you, we got your back. Also to make it a fun and enjoyable experience for users of Pokemon Hero, we also added a function whereby Pokemon between generation one to four, will randomly spawn anywhere on the map(within Singapore) that the users can capture and be like a Pokemon Trainer. 

### Target Audience

The target audience is whoever is in Singapore. As long as they are within Singapore borders, they can be a Pokemon Hero!

### Organisational Goals

The goal of this web application is to make using the map a fun and interactive experience whereby people of all ages can enjoy.

### User Goals
The goal of the user will be either to fill their belly with some scrumptous food that is nearby to them, or to find an area in Singapore that they have yet to explore or to have the strongest Pokedex.

### Justification for the App

Most maps are boring and just get you to places. I want to change that. Have you every experienced walking while using a map and find yourself just staring blankly at the screen? Pokemon Hero aims to change that and whilst going to your destination, who knows, you might just encounter a legendary Pokemon!

## UI/UX

### Strategy

**Organisation**
* Objective: To fill people's lives with joy.

**User**
* Objective: To get to places/food locations/know the weather/capture Pokemon

* Needs: A pokedex to store the pokemon which would not disappear upon refresh/ Food places within a 5km radius / Location of a postal code/ Weather forecast

* Demographic:As long as two feet are planted in the little red dot, they are part of the demographic

* Pain point: Most maps are boring and exclude certain information(weather forecast etc).

User Stories | Acceptance Criteria(s)
I use map to walk around so boring| I need some sort of entertainment when I am walking to places.
Most map no weather forecast | I need to know whether to bring an umbrella out or not.
I wish pokemon Go had a gps function | Now i can walk and catch pokemon.



### Scope

**Functional Requirements**

Features
* Search for food nearby me
* Search for a place anywhere in Singapore
* Show weather forecasts
* Show current location of user
* Spawn random Pokemon
* Contain a Pokedex that can store and save the users data
* Mobile responsiveness
* Cute

### Structure
![Untitled-2023-03-09-1648](https://user-images.githubusercontent.com/122865466/223972881-55ef5402-2baa-4924-8038-7ca10cff7748.png)

### Skeleton
![Page 1](https://user-images.githubusercontent.com/122865466/223974710-b197ea27-b879-4139-9a45-1de0bf92a9c0.png)
![Map page](https://user-images.githubusercontent.com/122865466/223974729-3a1cad7f-0da2-4095-88d3-d661709edc95.png)


### Surface
**Colours**: For the page layout of the map most of the colours used are dark. A lot of contrasting colours are used to look more pleasing to the users eye. Such as (black vs neon green) ( blue vs yellow)

<img width="907" alt="colour" src="https://user-images.githubusercontent.com/122865466/223975352-c9627949-9eaa-44c8-8d7e-be2afaa051ee.png">



**Font Choice**: 'Chakra Petch', 'Inconsolata', We use nostalgic fonts to bring nostalgia to long time fans to reminisce about their childhood days.

**Icons and Markers**: All icons and markers are chosen whereby they will be highly visible to the user and also contrast against the map.

## Features
Features | Descriptions
Pokemon - Random Pokemon will spawn every 10 seconds on the map. Pokemon will vary in Combat Power and also be graded from 1 star to 4 stars. 4 Generations of pokemon will be available for the user to choose from.

Map search Food - Able to search for food near the user. With a radius of 5km. 

Map search Location - Able to pinpoint exact locations in Singapore. 

Weather- Map will update the weather forecast every two hourly.



### Limitations and future implementations
Limitations | Future Implementations to Resolve Limitations
Not all pokemon are available | Will update in time
Tracking GPS location service is unavailable | Will be available soon as our developers are already working on it
Pokemon has combat power but unable to battle | Pokemon battles will be implemented in the near future.


## Testing

### Test Cases
Test Case #1 : Ensure that the website loads. Expected Results- website loads with no faults
Test Case #2 : Monitor the pokemon to ensure that it spawns every 10 seconds. Expected Results- Pokemon randomly spawns every 10seconds
Test Case #3 : Search for food using the search function. Expected Results - Food that matches your search should appear within 5KM around you
Test Case #4 : Search for a specific location usings the places search function. Expected Results- Returns the searched location
Test Case #5 : Pokedex to store caught pokemon. Expected Results- Caught pokemon should appear in the pokedex and the grade must be shown
Test Case #6 : Upon page refresh, pokedex data must still be there. Expected Results - Pokedex data is still there
Test Case #7 : On pokedex clear button click, pokedex Data is cleared. Expected Results - Exactly what I said

### Testing for Mobile Responsiveness
 * Testing was done using Responsively across iPhone 14, iPad, and Generic Laptop.


## Technologies Used
1. HTML 
    - To create the basic structure of the web application.

2. CSS 
    - To style and present the HTML elements on the web application.

3. JavaScript
    - To create interactive HTML elements on the web application.

4. [Bootstrap v5.1](https://getbootstrap.com/docs/5.1/getting-started/introduction/) 
    - To include bootstrap style/presentation and interactive bootstrap components on the web application. 

5. [Leaflet](https://leafletjs.com/) and [Markercluster](https://github.com/Leaflet/Leaflet.markercluster) 
    - To create an interactive map on the web application.

6. [Axios](https://github.com/axios/axios)
    - To retrieve data from geoJSON files and APIs.

7. [postman](https://postman.com)
    - To test the json file.

8. [Google Fonts](https://fonts.google.com/)
    - To select font families for the web application.

9. [Local storage]
    - To store the pokedex data.



10. [GitHub Pages](https://pages.github.com/)
    - For the deployment of this web application.


## Deployment
The web application is hosted on Netlify (https://flourishing-quokka-df4a64.netlify.app/#)

**Steps to deploy web application on GitHub Pages**
1. On GitHub, navigate to the site's repository.
2. Under the repository name click on Settings.
3. In the "Code and automation" section of the sidebar, click on Pages.
4. Under "GitHub Pages" section, use the None or Branch drop-down menu and select a publishing source. For this web application, select **main**.
5. Optionally, use the drop-down menu to select a folder for the publishing source.
6. Click Save.


## Credits
1. Data.gov.sg
    - Data sources (geoJSON files and APIs) are obtained from [data.gov.sg](https://data.gov.sg/).

2. Flaticon
    - Other icons and custom map markers are obtained from [Flaticon](https://www.flaticon.com/). The icons and markers are made by Vectorslab, Freepik and Pixel perfect. 

3. Foursquared
      - Use foursquared for the food search
      
4. PokeApi
       - To extract Pokemon Data
