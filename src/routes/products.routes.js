const  { Router } = require ("express");
const ProductsController = require("../Controllers/ProductsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const productsRoutes = Router();


const productsController = new ProductsController() 

productsRoutes.use(ensureAuthenticated)

productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id",productsController.update);
productsRoutes.get("/:id",productsController.show);
productsRoutes.get("/",productsController.index);
productsRoutes.delete("/:id",productsController.delete);


module.exports = productsRoutes;