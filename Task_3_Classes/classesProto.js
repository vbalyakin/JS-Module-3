// 3)	Create class Animal and two child classes: Dog and Cat, using of prototype inheritance. 
// Создать класс Animal и двух его наследников, используя прототипное наследование (через __proto__ или через extends?)
// Class Animal has method getName() (name can be received via constructor). 
// Класс Animal должен иметь метод getName и имя должен получать через конструктор
// Classes Dog and Cat has methods meow and bark and return string (‘Cat/Dog {name} is saying meow/bark’).
// Классы Собака и Кот должны иметь методы мяукания и рычания и возвращать строку, мол «Собака Рекс сказала гав» или «Кот Яша сказал мяу»

const animal = new Object({
    getName: function() { // первый вариант
        return this.name;
    }
});

// Object.prototype.getName = function() { // второй вариант
//     return this.name;
// };

const cat = Object.create(animal);
cat.name = "Yasha";
cat.meow = function () {
    return "Meow! My name is " + cat.getName();
};

const dog = Object.create(animal);
dog.name = "Jack";
dog.bark = function () {
    return "Bark! My name is " + dog.getName();
};

console.log(cat.meow());
console.log(dog.bark());

