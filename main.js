"use strict";

document.addEventListener('DOMContentLoaded', getCountriesApi);

// The main container where the countries will be added. ----------------
let mainCountriesCont = document.querySelector('.countriesContainer');

function getCountriesApi(){

  fetch("https://restcountries.com/v3.1/all")
  .then(res => {
    if (!res.ok) {
      throw Error('error')
    } else {
      return res.json()
      }
    }
  )
  .then(data => {
    let countries = data.map(country => {
      let countryObject = {
        name: country.name.common,
        capital: country.capital,
        population: country.population,
        region: country.region,
        subRegion: country.subregion,
        flag: country.flags.png
      }
    return countryObject;
    })
    let sortedCountries = countries.sort((a, b) => {
        let nameA = a.name;
        let nameB = b.name;

        if (nameA > nameB){
          return 1
        }
        if (nameA < nameB){
          return -1
        }
        if (nameA === nameB){
          return 0
        }
      })
    console.log(`A country object example:`, countries[0]);
    country(sortedCountries);
  })
  .catch(error => console.log(error));
}


function country(array){
  console.log(`The item is an Array: ${Array.isArray(array)}`);
  console.log(`The number of countries is: ${array.length}`);
    for (let i = 0; i < array.length; i++){
      // Creating an individual country div.
      let countryDiv = document.createElement("div");
      countryDiv.classList.add("countryContainer");
      // Creating the country info div.
      let countryInfoDiv = document.createElement("div");
      countryInfoDiv.classList.add("countryInfo");
      // Creating the separate country info points.
      // Name. --------------------------------------
      let nameParagraph = document.createElement("p");
      nameParagraph.classList.add("highlight");
      let nameText = document.createTextNode(`${array[i].name}`);
      nameParagraph.appendChild(nameText);
      countryInfoDiv.appendChild(nameParagraph);
      // Capital. --------------------------------------
      let capitalParagraph = document.createElement("p");
      let capitalText = document.createTextNode(`Capital: ${array[i].capital}`);
      capitalParagraph.appendChild(capitalText);
      countryInfoDiv.appendChild(capitalParagraph);
      // Population. --------------------------------------
      let populationParagraph = document.createElement("p");
      let populationText = document.createTextNode(`Pop: ${array[i].population}`);
      populationParagraph.appendChild(populationText);
      countryInfoDiv.appendChild(populationParagraph);
      // Region. --------------------------------------
      let regionParagraph = document.createElement("p");
      let regionText = document.createTextNode(`Region: ${array[i].region}`);
      regionParagraph.appendChild(regionText);
      countryInfoDiv.appendChild(regionParagraph);
      // Sub-Region. --------------------------------------
      let subRegionParagraph = document.createElement("p");
      let subRegionText = document.createTextNode(`Sub-Reg: ${array[i].subRegion}`);
      subRegionParagraph.appendChild(subRegionText);
      countryInfoDiv.appendChild(subRegionParagraph);
      // Creating the country info div and img elements.
      let countryFlagDiv = document.createElement("div");
      countryFlagDiv.classList.add("countryFlag");
      let flagImg = document.createElement("img");
      flagImg.setAttribute("src", `${array[i].flag}`);
      flagImg.setAttribute("alt", `The flag of ${array[i].name}`);
      countryFlagDiv.appendChild(flagImg);


      countryDiv.appendChild(countryInfoDiv);
      countryDiv.appendChild(countryFlagDiv);

      mainCountriesCont.appendChild(countryDiv);
  }
}
