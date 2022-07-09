//const fs = require('fs')
const notes = require("./notes.js")
const chalk = require('chalk')
const yargs = require('yargs')

//const msg = getNotes()
//console.log(msg)

// Customize yargs version
yargs.version('1.0.0')

// add, remove, read, list

// Create add command
yargs.command({
    command: "add",
    describe: "Adding a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body)
    }
})


// Create remove command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
})

// Create read command
yargs.command({
    command: "read",
    describe: "Read a note",
    handler: function () {
        console.log("Reading the note")}
})

// Create list command
yargs.command({
    command: "list",
    describe: "List your notes",
    handler: function () {
        console.log("Listing out all notes")
    }
})

yargs.parse()