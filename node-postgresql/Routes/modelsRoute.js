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
        const modelo = await modelsController.selectModelById(id);
        if (modelo.length === 0) {
            return res.json({ message: "Modelo não encontrado" });
        }
        res.json(usuario);
    } catch (erro) {
        return res.json({ message: "Erro ao buscar modelo por ID"});
    }
});



modelsRouter.post("/modelos", async (req,res) =>{
    try{
        if(Object.keys(req.body).length === 0){
            return res.json({ message: "Não é possivel adicionar um item nulo" })
        }
         await modelsController.insertModel(req.body)
         res.sendStatus(201)
    } catch (erro){
         return res.json({message: "Erro:", erro})
    }
 })

 modelsRouter.put("/modelos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, modelo} = req.body;
    try {
        const rowsAffected = await modelsController.updateModel(id, { nome, modelo});
        res.json({ message: "modelo atualizado com sucesso" });
    } catch (erro) {
        return res.json({message: "Erro:", erro})
    }
});

modelsRouter.delete("/modelos/:id", async (req, res) =>{
    try{
        await modelsController.deleteModel(req.params.id);
        res.sendStatus(204)
        return res.json({message: "Modelo deletado com sucesso"})
    } catch (erro){
        return res.json({message: "Erro:", erro})
    }
})

module.exports = modelsRouter