const animal = new Object({
    getName: function() {
        return this.name;
    }
});

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

