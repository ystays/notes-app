const fs = require('fs')
const chalk = require('chalk')




const getNotes = function () {
    return "Your notes..."
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log("New note added!")
    } else {
        console.log("Note title taken!")
    }


}

const removeNote = function (title) {
    // load existing notes
    const notes = loadNotes()
    // use array filter method to remove matching note, if any
    const tokeepNotes = notes.filter(function (note) {
        return note.title !== title
    })
    // save the newly-created array
    if (notes.length === tokeepNotes.length) {
        console.log(chalk.bgRed("No note \"" + title + "\" found"))
    } else {
        saveNotes(tokeepNotes)
        console.log(chalk.bgGreen("Note \"" + title + "\" removed"))
    }


}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}