const fs = require('fs')
const chalk = require('chalk')




const getNotes = () => {
    return "Your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
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

const removeNote = (title) => {
    // load existing notes
    const notes = loadNotes()
    // use array filter method to remove matching note, if any
    const tokeepNotes = notes.filter((note) => note.title !== title)
    // save the newly-created array
    if (notes.length === tokeepNotes.length) {
        console.log(chalk.bgRed("No note \"" + title + "\" found"))
    } else {
        saveNotes(tokeepNotes)
        console.log(chalk.bgGreen("Note \"" + title + "\" removed"))
    }


}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)
    if (foundNote) {
        console.log(chalk.bold.underline.green(foundNote.title))
        console.log(foundNote.body)
    } else {
        console.log(chalk.inverse.red("No note found."))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgYellow("Your notes"))
    notes.forEach(note => {
        console.log(note.title)
    }); 
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = () => {
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
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}