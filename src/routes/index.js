const { Router } = require("express") ;
const usersRouter = require("./users.routes");
const clientsRouter = require("./clients.routes");
const sessionsRouter = require("./sessions.routes");
const productsRouter = require("./products.routes");
const nfeRouter = require("./nfe.routes")

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/products", productsRouter);
routes.use("/clients", clientsRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/nfe", nfeRouter );

module.exports = routes;
