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
    command: "find",
    describe: "Find character by given parameters",
    builder: {
        parameter: {
            type: "string",
            demandOption: true,
            alias: "p",
            describe: "Any parameter for search"
        },
        species: {
            type: "string",
            demandOption: true,
            alias: "s",
            describe: "Species of parameter"
        },
    },
    handler({
        parameter, species
    }) {
        builder.findCharacterByParameter(parameter, species);
    }
});
yargs.command({
    command: "findbyset",
    describe: "Find character by given parameters",
    builder: {
        parameter: {
            type: "string",
            demandOption: true,
            alias: "p",
            describe: "Any parameter for search"
        },
        species: {
            type: "string",
            demandOption: true,
            alias: "s",
            describe: "Species of parameter"
        },
    },
    handler({
        parameter, species
    }) {
        builder.findCharacterBySetOfParameters(parameter, species);
    }
});

yargs.parse();
