const { Router} = require("express");

const SessionsControllers = require("../Controllers/SessionsController");

const sessionsController =  new SessionsControllers();

const sessionsRoutes = Router();

sessionsRoutes.post("/", sessionsController.create)

module.exports = sessionsRoutes;