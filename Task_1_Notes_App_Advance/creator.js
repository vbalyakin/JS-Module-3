const fs = require("fs"),
    path = require("path"),
    pathToNotesStorage = path.join("./notes.json"),
    pathToNotesInCSV = path.join("./notes.csv"),
    pathToNotesInJSON = path.join("./fromCSVNotes.json"),
    pathToUpdatedNotes = path.join("./updatedNotes.json"),
    csv = require("csvtojson"),
    format = require("date-format"),
    {
        Parser
    } = require("json2csv");

const getNotesFromJSON = () => {
    return JSON.parse(fs.readFileSync(pathToNotesStorage));
};

const writeNotesToJSON = (array) => {
    fs.writeFileSync(pathToNotesStorage, JSON.stringify(array, null, "\t"));
};

const sortBodyOrTitle = (array, data) => {
    if (data === "body") {
        array.sort((a, b) => b.body.length - a.body.length);
    }
    if (data === "title") {
        array.sort((a, b) => a.title.length - b.title.length);
    }
};

const sortTimeOrTitleAlphabetic = (array, data) => {
    if (data === "time") {
        array.sort((a, b) => a.time > b.time ? -1 : 1);
    }
    if (data === "titlealph") {
        array.sort((a, b) => a.title < b.title ? -1 : 1);
    }
};

const getAllNotes = () => {
    try {
        return getNotesFromJSON();
    } catch (error) {
        fs.writeFileSync(pathToNotesStorage, JSON.stringify([]));
        return getNotesFromJSON();
    }
};

const createNote = (title, body) => {
    const note = {},
        array = getAllNotes(),
        timeOfCreate = format.asString("dd/MM/yy hh:mm:ss", new Date());
    note.title = title;
    note.body = body;
    note.time = timeOfCreate;
    const dublicateFinder = array.find(element => element.title === title);
    if (dublicateFinder) {
        console.log("You create dublicate of note!");
    } else {
        array.push(note);
        writeNotesToJSON(array);
    }
};

const listOfNotes = () => {
    const array = getAllNotes();
    if (array.length !== 0) {
        array.forEach(element => {
            console.log(element);
        });
    } else {
        console.log("You haven't notes!");
    }
};

const readNote = title => {
    const array = getAllNotes(),
        noteFinder = array.find(element => element.title === title),
        result = noteFinder ? `Your note:\n${title} ${noteFinder.body}` : "Note isn't exist!";
    console.log(result);
};

const removeNote = title => {
    const array = getAllNotes();
    const sortedNotes = array.length !== 0 ? array.filter(note => note.title !== title) : [];
    if (array.length !== sortedNotes.length) {
        console.log(`Note with title -  ${title} - succesfully deleted!`);
        fs.writeFileSync(pathToNotesStorage, JSON.stringify(sortedNotes, null, "\t"));
    } else {
        result = array.length === 0 ? "No any notes for 'delete' operation!" : "Note, which you want delete isn't exist!";
        console.log(result);
    }
};

const sortNotes = data => {
    const array = getAllNotes();
    sortBodyOrTitle(array, data);
    sortTimeOrTitleAlphabetic(array, data);
    writeNotesToJSON(array);
};

const writeNotesToCSV = () => {
    const fields = ["title", "body", "time"],
        notes = getAllNotes(),
        json2csvParser = new Parser({
            fields
        }),
        csv = json2csvParser.parse(notes);
    fs.writeFileSync(pathToNotesInCSV, csv);
};

const writeNotesFromCSVToJSON = () => {
    csv()
        .fromFile(pathToNotesInCSV)
        .then(jsonObject => {
            fs.writeFileSync(pathToNotesInJSON, JSON.stringify(jsonObject, null, "\t"));
        });
};

const findAndUpdateNote = (title, body) => {
    const array = getAllNotes(),
        timeOfCreate = new Date().toLocaleString("en-GB");
    let counter = 0;
    array.map(note => {
        updater = note.title === title;
        if (updater) {
            note.title = title;
            note.body = body;
            note.time = timeOfCreate;
            counter++;
        }
    });
    const result = counter ? "Note updated succesfully!" : "Note with given title not founded!";
    console.log(result);
    fs.writeFileSync(pathToUpdatedNotes, JSON.stringify(array, null, "\t"));
};

module.exports = {
    createNote,
    listOfNotes,
    readNote,
    removeNote,
    sortNotes,
    writeNotesToCSV,
    writeNotesFromCSVToJSON,
    findAndUpdateNote
};