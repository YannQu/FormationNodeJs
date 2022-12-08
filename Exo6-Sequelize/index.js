const db = require('./config/databaseSeq');
const series = require('./models/series');
const express = require("express");
const app = express();
app.use(express.json())


app.get("/series", async function (req, res) {
    const mesSeries = await series.findAll();
    return res.status(201).json({series: mesSeries});
});

app.get("/series/:id", async function (req, res) {
    const id = req.params.id;
    const maSerie = await series.findOne(id);
    console.log(maSerie);
    return res.status(201).json({serie: maSerie});
});

app.post("/series/addSerie", async function (req, res) {
    const name = req.body.name;
    const nbSaisons = req.body.nbSaisons;
    if (!name || !nbSaisons) {
       return res.status(404).json({Error: "Serie name and number of saisons are required !"});
    }
    const newSerie = await series.addSerie(name, nbSaisons);
    return res.status(201).json({message: "Serie added !", newSerie});
});

app.post("/series/removeSerie", async function (req, res) {
    const id = req.body.id;
    if (!id) {
       return res.status(404).json({Error: "id is required !"});
    }
    const removedSerie = await series.removeSerie(id);
    return res.status(201).json({message: "Serie deleted !", removedSerie});
});

app.listen(8080, function () {
    console.log("Server is running on port 8080 ");
});