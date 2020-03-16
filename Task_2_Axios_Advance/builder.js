const axios = require("axios").default,
  fs = require("fs"),
  path = require("path"),
  format = require("date-format"),
  pathToCharactersData = path.join("./rickAndMortyHeroes.json"),
  pathToSearchResults = path.join("./searchResults.json");

const getAllCharacters = () => {
  axios({
      method: "get",
      url: "https://rickandmortyapi.com/api/character/",
    })
    .then(response => {
      const countOfAllCharacters = response.data.info.count;
      const counter = countOfCharacters(countOfAllCharacters);
      axios({
          method: "get",
          url: "https://rickandmortyapi.com/api/character/" + counter,
        })
        .then(response => {
          fs.writeFileSync(pathToCharactersData, JSON.stringify(response.data, null, "\t"));
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};

const countOfCharacters = (countOfAllCharacters) => {
  let stringWithCountOfCharacters = "";
  for (let i = 1; i <= countOfAllCharacters; i++) {
    stringWithCountOfCharacters = stringWithCountOfCharacters + i + ",";
    if (i === countOfAllCharacters) {
      stringWithCountOfCharacters = stringWithCountOfCharacters + i;
    }
  }
  return stringWithCountOfCharacters;
};

const getCharactersFromJSON = () => {
  return JSON.parse(fs.readFileSync(pathToCharactersData));
};

const getDataStamp = () => {
  return format.asString("dd/MM/yy hh:mm:ss", new Date());
};

const getCharactersData = () => {
  try {
    return getCharactersFromJSON();
  } catch (error) {
    fs.writeFileSync(pathToNotesStorage, JSON.stringify([]));
    return getCharactersFromJSON();
  }
};

const verifyAndWrite = (array) => {
  if (array.length === 1) {
    array.push("Characters not founded!");
  }
  fs.writeFileSync(pathToSearchResults, JSON.stringify(array, null, "\t"));
};

const addResultToArray = (character, similarity, arrayWithResults, arrayWithParameters) => {
  if (similarity === arrayWithParameters.length) {
    arrayWithResults.push(character);
  }
  return arrayWithResults;
};

const compareCharacterFieldsWithGivenParameters = (character, arrayWithParameters, arrayWithSpecies, similarity, arrayWithResults) => {
  for (let key in character) {
    for (let i = 0; i < arrayWithParameters.length; i++) {
      if (key.toLowerCase() === arrayWithParameters[i].toLowerCase() &&
        character[key].toString().toLowerCase() === arrayWithSpecies[i].toLowerCase()) {
        similarity++;
        addResultToArray(character, similarity, arrayWithResults, arrayWithParameters);
      }
    }
  }
  return arrayWithResults;
};

const findCharacterBySetOfParameters = (parameters, species) => { // node runner findbyset -p "status, species, gender" -s "dead, robot, female"
  const array = getCharactersData(),
    arrayWithResults = [],
    divider = /\s*,\s*/,
    arrayWithParameters = parameters.split(divider),
    arrayWithSpecies = species.split(divider);
  arrayWithResults.push("Results of search in " + getDataStamp());
  array.forEach(character => {
    let similarity = 0;
    compareCharacterFieldsWithGivenParameters(character, arrayWithParameters, arrayWithSpecies, similarity, arrayWithResults);
  });
  verifyAndWrite(arrayWithResults);
};

const findCharacterByParameter = (parameter, species) => { // node runner find -p "status" -s "alive" OR node runner find -p "species" -s "Human"
  const array = getCharactersData(),
    arrayWithResults = [];
  arrayWithResults.push("Results of search in " + getDataStamp()); // array length = 1
  array.forEach((character) => {
    for (let key in character) {
      if (key.toLowerCase() === parameter.toLowerCase() && character[key].toString().toLowerCase() === species.toLowerCase()) {
        arrayWithResults.push(`${character.name} - ${key} - ${character[key]}`);
      }
    }
  });
  verifyAndWrite(arrayWithResults);
};

module.exports = {
  getAllCharacters,
  findCharacterByParameter,
  findCharacterBySetOfParameters
};
