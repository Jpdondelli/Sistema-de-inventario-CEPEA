require("dotenv").config();
const express = require("express");
const modelsController = require("./controllers/modelsController");
const componentsController = require("./controllers/componentsController");
const brandsController = require("./controllers/brandsController");
const userRoute = require("./Routes/userRoute");
const componentsRoute = require("./Routes/componentsRoute");
const brandsRoute = require("./Routes/brandsRoute");
const modelsRoute = require("./Routes/modelsRoute");

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(userRoute);
app.use(componentsRoute)
app.use(brandsRoute);
app.use(modelsRoute);

app.get("/", (req, res) => {
    res.json({ message: "Funcionou" });
});

app.listen(port)

console.log("Servidor escutando")