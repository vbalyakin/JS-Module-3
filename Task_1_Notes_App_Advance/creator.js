const fs = require("fs"),
    path = require("path"),
    pathToNotesStorage = path.join("./notes.json"),
    pathToNotesInCSV = path.join("./notes.csv"),
    pathToNotesInXLSX = path.join("./notes.xlsx"),
    pathToNotesInJSON = path.join("./fromcsvnotes.json"),
    csv = require("csvtojson"),
    json2xls = require("json2xls"),
    {
        Parser
    } = require("json2csv");

const getAllNotes = () => {
    try {
        return JSON.parse(fs.readFileSync(pathToNotesStorage));
    } catch (error) {
        fs.writeFileSync(pathToNotesStorage, JSON.stringify([]));
        return JSON.parse(fs.readFileSync(pathToNotesStorage));
    }
};

const createNote = (title, body) => {
    const note = {},
        array = getAllNotes(),
        // date = new Date(),
        timeOfCreate = new Date().toLocaleString("en-GB");
    note.title = title;
    note.body = body;
    note.time = timeOfCreate;
    const dublicateFinder = array.find(element => element.title === title);
    if (dublicateFinder) {
        console.log("You create dublicate of note!");
    } else {
        array.push(note);
        fs.writeFileSync(pathToNotesStorage, JSON.stringify(array, null, "\t"));
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
        result = noteFinder ? `Your note:\n${title} - ` + noteFinder.body : "Note isn't exist!";
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
    if (data === "time") { // сортировка по времени
        array.sort((a, b) => a.time > b.time ? -1 : 1);
        fs.writeFileSync(pathToNotesStorage, JSON.stringify(array, null, '\t'));
    }
    if (data === "title") { // сортировка по длине названия
        array.sort((a, b) => a.title.length - b.title.length);
        fs.writeFileSync(pathToNotesStorage, JSON.stringify(array, null, "\t"));
    }
    if (data === "body") { // сортировка по длине самое заметки
        array.sort((a, b) => b.body.length - a.body.length);
        fs.writeFileSync(pathToNotesStorage, JSON.stringify(array, null, "\t"));
    }
    if (data === "titlealph") { // сортировка по алфавиту
        array.sort((a, b) => a.title < b.title ? -1 : 1);
        fs.writeFileSync(pathToNotesStorage, JSON.stringify(array, null, "\t"));
    }
};

const writeNotesToCSV = () => { // выводит данные в CSV файл
    const fields = ["title", "body", "time"],
        notes = getAllNotes(),
        json2csvParser = new Parser({
            fields
        }),
        csv = json2csvParser.parse(notes);
    fs.writeFileSync(pathToNotesInCSV, csv);
    // console.log(csv);
};

const writeNotesToXLS = () => { // ошибка в самом модуле!
    const xls = json2xls(pathToNotesStorage);
    fs.writeFileSync(pathToNotesInExcel, xls);
};

const writeNotesToXLSSecond = () => { // и тут тоже ошибка!
    let xls = json2xls(pathToNotesStorage);
    fs.writeFileSync(pathToNotesInXLSX, xls, "binary", (err) => {
        if (err) {
            console.log("writeFileSync :", err);
        }
        console.log(pathToNotesInXLSX + " file is saved!");
    });
};

const writeNotesFromCSVToJSON = () => { // выводит данные из CSV в JSON
    csv()
        .fromFile(pathToNotesInCSV)
        .then(jsonObject => {
            fs.writeFileSync(pathToNotesInJSON, JSON.stringify(jsonObject, null, "\t"));
        });
};

module.exports = {
    createNote,
    listOfNotes,
    readNote,
    removeNote,
    sortNotes,
    writeNotesToCSV,
    writeNotesToXLS,
    writeNotesFromCSVToJSON
};