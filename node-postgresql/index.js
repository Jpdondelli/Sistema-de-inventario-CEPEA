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
const softwaresController = require("./controllers/softwaresController");


const userRoutes = require("./Routes/userRoute");
const componentsRoutes = require("./Routes/componentsRoute");
const brandsRoutes = require("./Routes/brandsRoute");
const modelsRoutes = require("./Routes/modelsRoute");
const productsRouter = require("./Routes/productsRoute");
const projectsRouter = require("./Routes/projectsRoute");
const responsiblesRouter = require("./Routes/responsibleRoute");
const equipmentsRouter = require("./Routes/equipmentsRoute");
const softwaresRouter = require("./Routes/softwaresRoute")


const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(componentsRoutes)
app.use(brandsRoutes);
app.use(modelsRoutes);
app.use(productsRouter);
app.use(projectsRouter);
app.use(responsiblesRouter);
app.use(equipmentsRouter);
app.use(softwaresRouter)


app.get("/", (req, res) => {
    res.json({ message: "Funcionou" });
});

app.listen(port)

console.log("Servidor escutando")