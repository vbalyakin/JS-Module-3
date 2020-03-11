// 3)	Create class Animal and two child classes: Dog and Cat, using of prototype inheritance. 
// Создать класс Animal и двух его наследников, используя прототипное наследование (через __proto__ или через extends?)
// Class Animal has method getName() (name can be received via constructor). 
// Класс Animal должен иметь метод getName и имя должен получать через конструктор
// Classes Dog and Cat has methods meow and bark and return string (‘Cat/Dog {name} is saying meow/bark’).
// Классы Собака и Кот должны иметь методы мяукания и рычания и возвращать строку, мол «Собака Рекс сказала гав» или «Кот Яша сказал мяу»

const animal = {
    getName(name) {
        return name;
    }, 
};

const dog = { // prototype? 
    //__proto__: animal, - ЧТО-ТО НЕ ТАК
    name: animal.getName("Jack"),
    bark() {
        return `Dog ${this.name} is saying bark!`;
    }
};

const cat = {
    __proto__: animal,
    name: animal.getName("Yasha"),
    meow() {
        return `Cat ${this.name} is saying meow!`;
    }
};

console.log(dog.bark());
console.log(cat.meow());