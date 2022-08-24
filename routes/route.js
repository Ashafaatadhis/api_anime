const route = require("express").Router();
const KusonimeController = require("../controllers/KusonimeController");

route.get("/kusonime/:anime", KusonimeController);

module.exports = route;
