// запрос на 'Beth Smth', id - 4
const axios = require("axios").default,
  fs = require("fs"),
  path = require("path"),
  pathToCharactersData = path.join("./rickAndMortyHeroes.json");

const getCharactersFromJSON = () => {
  return JSON.parse(fs.readFileSync(pathToCharactersData));
};

const getCharactersData = () => {
  try {
    return getCharactersFromJSON();
  } catch (error) {
    fs.writeFileSync(pathToNotesStorage, JSON.stringify([]));
    return getCharactersFromJSON();
  }
};

const readCharacter = status => {
  const array = getCharactersData().results;
  let counter = 0;
  array.forEach(character => {
    if (character.status === status) {
      console.log(`${character.name} - ${character.status}`);
      counter++;
    }
  });
  if(counter === 0) {
    console.log("Characters not founded!");
  }
};

const getAllCharacters = () => {
  axios({
      method: 'get',
      url: 'https://rickandmortyapi.com/api/character/',
    })
    .then(response => {
      fs.writeFileSync(pathToCharactersData, JSON.stringify(response.data, null, "\t"));
    })
    .catch(error => console.log(error));
};



module.exports = {
  getAllCharacters,
  readCharacter
};