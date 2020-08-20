class Animal {
    constructor(animal, name) {
        this.animal = animal;
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

class Dog extends Animal {
    constructor(name, voice) {
        super("Dog", name);
        this.voice = voice;
    }
    bark() {
        return `${this.voice}! I am a ${this.animal} and my name is ` + this.getName(); // можно this.name
    }
}

class Cat extends Animal {
    constructor(name, voice) {
        super("Cat", name);
        this.voice = voice;
    }
    meow() {
        return `${this.voice}! I am a ${this.animal} and my name is ` + this.getName();
    }
}

let shepherd = new Dog("Jack", "Bark"),
    maineCoon = new Cat("Yasha", "Meow");
console.log(maineCoon.meow());
console.log(shepherd.bark());
