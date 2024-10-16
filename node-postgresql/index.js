require("dotenv").config();
const express = require("express");
const modelsController = require("./controllers/modelsController");
const componentsController = require("./controllers/componentsController");
const brandsController = require("./controllers/brandsController");
const usersController = require("./controllers/userController");
const productsController = require("./controllers/productsController");
const projectsController = require("./controllers/projectsController");
const responsiblesController = require("./controllers/responsiblesController");
const equipmentsController = require("./controllers/equipmentsController");


const userRoute = require("./Routes/userRoute");
const componentsRoute = require("./Routes/componentsRoute");
const brandsRoute = require("./Routes/brandsRoute");
const modelsRoute = require("./Routes/modelsRoute");
const productsRouter = require("./Routes/productsRoute");
const projectsRouter = require("./Routes/projectsRoute");
const responsiblesRouter = require("./Routes/responsibleRoute");
const equipmentsRouter = require("./Routes/equipmentsRoute");


const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(userRoute);
app.use(componentsRoute)
app.use(brandsRoute);
app.use(modelsRoute);
app.use(productsRouter);
app.use(projectsRouter);
app.use(responsiblesRouter);
app.use(equipmentsRouter);


app.get("/", (req, res) => {
    res.json({ message: "Funcionou" });
});

app.listen(port)

console.log("Servidor escutando")