const parameters = "раз, два,  три,четыре";
let divider = /\s*,\s*/;
let arrayWithParameters = parameters.split(divider);
console.log(arrayWithParameters);
character = {
    "name": "Man",
    age: 25
};


console.log(character.hasOwnProperty("name"));
console.log(character.hasOwnProperty("age" && "name"));