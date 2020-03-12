const yargs = require("yargs"),
    builder = require("./builder");

yargs.command({
    command: "add",
    describe: "add new unique note",
    builder: {
        title: {
            type: "string",
            demandOption: true,
            alias: "t",
            describe: "Title of new note"
        },
        body: {
            type: "string",
            demandOption: true,
            alias: "b",
            describe: "Content of new note"
        }
    },
    handler({
        title,
        body
    }) {
        creator.createNote(title, body);
    }
});
yargs.command({
    command: "getdata",
    describe: "download data to local json file",
    handler() {
        builder.getAllCharacters();
    }
});
yargs.command({
    command: "list",
    describe: "list all notes",
    handler() {
        creator.listOfNotes();
    }
});
yargs.command({
    command: "read",
    describe: "read character by status",
    builder: {
        status: {
            type: "string",
            demandOption: true,
            alias: "s",
            describe: "Status of character"
        }
    },
    handler({
        status
    }) {
        builder.readCharacter(status);
    }
});
yargs.command({ // РАБОТАЕТ!
    command: "sort",
    describe: "sort by data",
    builder: {
        data: {
            type: "string",
            demandOption: true,
            alias: "d",
            describe: "Sort by data"
        }
    },
    handler({data}) {
        creator.sortNotes(data);
    }
});
yargs.command({ // РАБОТАЕТ!
    command: "writetojson",
    describe: "write notes to JSON from CSV",
    handler() {
        creator.writeNotesFromCSVToJSON();
    }
});

yargs.parse();