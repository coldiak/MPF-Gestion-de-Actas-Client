const addBolsa = require("express").Router();
const { Bolsa } = require("../db");

addBolsa.post("/:id", async (req, res) => {
  try {
    const acta_id = req.params.id;
    const { nro_precinto, color_precinto, notas } = req.body;
    const newBolsa = await Bolsa.create({
      acta_id: acta_id,
      nro_precinto: nro_precinto,
      color_precinto: color_precinto,
      notas: notas,
    });
    return res.status(200).send(newBolsa);
  } catch (error) {
    console.log(error);
  }
});

module.exports = addBolsa;