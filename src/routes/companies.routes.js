const  { Router } = require ("express");
const CompaniesController = require("../Controllers/CompaniesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const companiesRoutes = Router();


const companiesController = new CompaniesController() 

companiesRoutes.use(ensureAuthenticated)

companiesRoutes.post("/", companiesController.create);
companiesRoutes.put("/:id",companiesController.update);
companiesRoutes.get("/:id",companiesController.show);
companiesRoutes.get("/",companiesController.index);
companiesRoutes.delete("/:id",companiesController.delete);


module.exports = companiesRoutes;