const express = require("express");
const modelsRouter = express.Router();
const modelsController = require("../controllers/modelsController");

/* ----------------------CRUD modelo------------------------ */
modelsRouter.get("/modelos", async (req,res) =>{
    const modelos = await modelsController.selectModels()
    res.json(modelos)
})

modelsRouter.get("/modelos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const marcas = await modelsController.selectModelById(id);
        if (!marcas) {
            return res.status(404).json({ message: "modelo não encontrado" });
        } 
        res.json(marcas);
    } catch (erro) {
        console.error("Erro ao buscar modelo por ID:", erro);
        res.sendStatus(500);
    }
});


modelsRouter.post("/modelos", async (req,res) =>{
    try{
         await modelsController.insertModel(req.body)
         res.sendStatus(201)
    } catch (erro){
         console.log("Erro:", erro)
         res.sendStatus(500)
    }
 })

 modelsRouter.patch("/modelos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, modelo} = req.body;
    try {
        const rowsAffected = await modelsController.updateModel(id, { nome, modelo});
        res.json({ message: "modelo atualizado com sucesso" });
    } catch (erro) {
        console.error("Erro ao atualizar modelo:", erro);
        res.sendStatus(500);
    }
});

modelsRouter.delete("/modelos/:id", async (req, res) =>{
    try{
        await modelsController.deleteModel(req.params.id);
        res.sendStatus(204)
    } catch (erro){
        console.error("Erro ao atualizar modelo:", erro);
        return res.sendStatus(500);
    }
})

module.exports = modelsRouter