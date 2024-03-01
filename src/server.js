require("express-async-errors")
require("dotenv/config");

const AppError = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = express();

app.use(cookieParser())
app.use(cors(
    {
        origin: ["https://djony-nfe.guilhermejp.com"],
        credentials: true,
    }
));
app.use(express.json())
app.use(routes);

app.use((error, request, response, next) => {
    if (error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
}
);

const PORT = process.env.PORT || 3334;

app.listen(PORT, () => console.log(`Server is running ${PORT}`));
