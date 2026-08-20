const express = require("express")
const cors = require('cors')
const db = require('./db.json')

const app = express()
app.use(cors( {
    origin: '*'
}))
app.get('/', (req, res) => {
    // called with coordinates left: number, top: number and a selection: string
    const coordinates = JSON.parse(req.headers.coordinates)
    const selection = req.headers.selection
    console.log(`coordinates: ${coordinates.left}`)
    console.log(`selection: ${selection}`)
    // check if the selection matches the coordinates in the db
    const correct = (coordinates.left === db[selection].left) && (coordinates.top === db[selection].top)
    res.json({
        "coordinates": coordinates,
        "selection": selection,
        "status": correct
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, (error) => {
    if(error) { throw error }
    console.log(`Express running on ${PORT}`)
})