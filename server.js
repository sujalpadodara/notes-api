const mongoose = require("mongoose");
const express = require('express');
const app = express();
const port = 3000;
const Note = require("./models/Note");

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Notes API');
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.get("/contact", (req, res) => {
    res.send("Contact Page");
});

app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/notes", async (req, res) => {

    try {

        const note = new Note({
            title: req.body.title,
            content: req.body.content
        });

        await note.save();

        res.send("Note Saved Successfully");

    } catch (err) {
        res.status(500).send(err.message);
    }

});
mongoose.connect("mongodb://127.0.0.1:27017/notesDB")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.get("/notes/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Note not found");
        }

        res.json(note);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put("/notes/:id", async (req, res) => {

    try {

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).send("Note not found");
        }

        res.json(updatedNote);

    } catch (err) {
        res.status(500).send(err.message);
    }

});

app.delete("/notes/:id", async (req, res) => {

    try {

        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).send("Note not found");
        }

        res.send("Note Deleted Successfully");

    } catch (err) {
        res.status(500).send(err.message);
    }

});