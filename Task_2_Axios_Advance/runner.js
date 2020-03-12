const yargs = require("yargs"),
    builder = require("./builder");

yargs.command({
    command: "getdata",
    describe: "download data to local json file",
    handler() {
        builder.getAllCharacters();
    }
});
yargs.command({
    command: "findstatus",
    describe: "Find character by status",
    builder: {
        status: {
            type: "string",
            demandOption: true,
            alias: "s",
            describe: "Status of character"
        },
    },
    handler({
        status
    }) {
        builder.findCharacterStatus(status);
    }
});
yargs.command({
    command: "findgender",
    describe: "Find character by gender",
    builder: {
        gender: {
            type: "string",
            demandOption: true,
            alias: "g",
            describe: "Gender of character"
        }
    },
    handler({
        gender
    }) {
        builder.findCharacterGender(gender);
    }
});
yargs.command({
    command: "findspecies",
    describe: "Find character by species",
    builder: {
        species: {
            type: "string",
            demandOption: true,
            alias: "s",
            describe: "Species of character"
        },
    },
    handler({
        species
    }) {
        builder.findCharacterSpecies(species);
    }
});

yargs.parse();
