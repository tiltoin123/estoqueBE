import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import Setting from "../models/Setting";
import Store from "../models/Stores";
import Suppliers from "../models/Suppliers";
import Products from "../models/Products";


// eslint-disable-next-line
const dbConfig = require("../config/database");
// import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

const models = [
  User,
  Store,
  Setting,
  Suppliers,
  Products
];

sequelize.addModels(models);

export default sequelize;
