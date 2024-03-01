const  { Router } = require ("express");
const ClientsController = require("../Controllers/ClientsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const clientsRoutes = Router();

const clientsController = new ClientsController() 

clientsRoutes.use(ensureAuthenticated)

clientsRoutes.post("/", clientsController.create);
clientsRoutes.put("/:id",clientsController.update);
clientsRoutes.get("/:id",clientsController.show);
clientsRoutes.delete("/:id",clientsController.delete);
clientsRoutes.get("/", clientsController.index);

module.exports = clientsRoutes;