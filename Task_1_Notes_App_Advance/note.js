const yargs = require("yargs"),
    creator = require("./creator");

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
    command: "list",
    describe: "list all notes",
    handler() {
        creator.listOfNotes();
    }
});
yargs.command({
    command: "read",
    describe: "read one note by its title",
    builder: {
        title: {
            type: "string",
            demandOption: true,
            alias: "t",
            describe: "Title of new note"
        }
    },
    handler({
        title
    }) {
        creator.readNote(title);
    }
});
yargs.command({
    command: "remove",
    describe: "remove one note by its title",
    builder: {
        title: {
            type: "string",
            demandOption: true,
            alias: "t",
            describe: "Title of new note"
        }
    },
    handler({
        title
    }) {
        creator.removeNote(title);
    }
});
yargs.command({
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
yargs.command({
    command: "writetocsv",
    describe: "export notes to CSV",
    handler() {
        creator.writeNotesToCSV();
    }
});
yargs.command({
    command: "writetojson",
    describe: "write notes to JSON from CSV",
    handler() {
        creator.writeNotesFromCSVToJSON();
    }
});
yargs.command({
    command: "update",
    describe: "update note with given title and body",
    builder: {
        title: {
            type: "string",
            demandOption: true,
            alias: "t",
            describe: "find by title"
        },
        body: {
            type: "string",
            demandOption: false,
            alias: "b",
            describe: "update body"
        }
    },
    handler({title,body}) {
        creator.findAndUpdateNote(title, body);
    }
});

yargs.parse();
