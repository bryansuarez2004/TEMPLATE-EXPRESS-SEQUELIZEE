const express = require("express");
const {
  getAll,
  create,
  update,
  remove,
} = require("../controllers/service.controllers");

const serviceRouter = express.Router();

serviceRouter.route("/").get(getAll).post(create);

serviceRouter.route("/:id").put(update).delete(remove);

module.exports = serviceRouter;
