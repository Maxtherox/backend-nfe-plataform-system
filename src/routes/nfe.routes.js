const  { Router } = require ("express");
const NfeController = require("../Controllers/NfeController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const nfeRoutes = Router();


const nfeController = new NfeController() 

nfeRoutes.use(ensureAuthenticated)

nfeRoutes.post("/", nfeController.create);
nfeRoutes.put("/:id", nfeController.update);
nfeRoutes.delete("/:id", nfeController.delete);
nfeRoutes.get("/:id", nfeController.show);
nfeRoutes.get("/", nfeController.index);



module.exports = nfeRoutes;