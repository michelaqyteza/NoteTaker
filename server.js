// Dependencies 
const express = require('express')
const path = require ('path')
const fs = require('fs')
const uniqid = require('uniqid')

// Creating server
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/assets')));

// Routes
// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/notes.html')));
app.get('/api/notes', (req, res) => {
    fs.readFile('./db.json',(error, data) =>{
        if (error){
            console.error(error)
        }else{
            res.send(data)
        }
    })
}) 
app.post('/api/notes', (req, res) => {
    fs.readFile('./db.json',(error, data) =>{
        if (error){
            console.error(error)
        }else{
            var notes = JSON.parse(data)
            var written = req.body
            written.id = uniqid()
            notes.push(written)
            var string = JSON.stringify(notes)
            fs.writeFile('./db.json', string, (error) =>{
                if (error){
                    console.error(error)
                }else{
                    console.log('Note has been saved!')
                    res.send("Saved")
                }
            })
        }
    })
})

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));