const  { Router } = require ("express");
const UsersController = require("../Controllers/UsersController"); //importação do controller, (como UserControllers é uma classe, ele precisa ser instanciado na memória) (instancia = realocar espaço na memória para a classe)
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const UsersValidatedController = require("../Controllers/UsersValidatedController");
const usersRoutes = Router();

const usersController = new UsersController() 
const usersValidatedController = new UsersValidatedController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/",  ensureAuthenticated, usersController.update);
usersRoutes.get("/validated", ensureAuthenticated, usersValidatedController.index);


module.exports = usersRoutes;