const db = require("../db/database");
const { DataTypes } = require("sequelize");

const Acta = db.define(
  "Acta",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    nro_mpf: {
      type: DataTypes.INTEGER,
    },
    nro_cij: {
      type: DataTypes.INTEGER,
    },
    nro_dil: {
      type: DataTypes.INTEGER,
    },
    nro_coop: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Acta;
