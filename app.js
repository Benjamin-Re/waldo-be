const express = require("express")
const cors = require('cors')
const db = require('./db.json')

const app = express()
let start = 0
let end = 0

app.use(cors( {
    origin: '*'
}))
app.get('/', (req, res) => {
    // called with coordinates left: number, top: number and a selection: string
    const coordinates = JSON.parse(req.headers.coordinates)
    const selection = req.headers.selection
    const game = req.headers.game
    console.log(`x: ${coordinates.x}, y:${coordinates.y}`)
    console.log(`selection: ${selection}`)
    // check if the selection matches the coordinates in the db
    const RADIUS = 0.05
    const correct = Math.hypot(coordinates.x - db[game][selection].x, coordinates.y - db[game][selection].y) <= RADIUS
    console.log(`${coordinates.x - db[game][selection].x}`)
    res.json({
        "coordinates": coordinates,
        "selection": selection,
        "status": correct
    })
})

app.get('/start', (req, res) => {
    start = Date.now()
    console.log(`start: ${start}`)
    res.json({
        status: true
    })
})

app.get('/end', (req, res) => {
    end = Date.now()
    const time = (end - start) / 1000
    res.status(200).json({
        "time": time
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, (error) => {
    if(error) { throw error }
    console.log(`Express running on ${PORT}`)
})