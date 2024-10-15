const express = require("express");
const responsiblesRouter = express.Router();
const responsiblesController = require("../controllers/responsiblesController");

/* ----------------------CRUD responsavel------------------------ */

responsiblesRouter.get("/responsaveis", async (req,res) =>{
    const marcas = await responsiblesController.selectResponsibles()
    res.json(marcas)
})

responsiblesRouter.get("/responsaveis/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const responsavel = await responsiblesController.selectResponsibleById(id);
        if (responsavel.length === 0) {
            return res.json({ message: "Responsavel não encontrado" });
        }
        res.json(usuario);
    } catch (erro) {
        return res.json({ message: "Erro ao buscar responsavel por ID:"});
    }
});

responsiblesRouter.post("/responsaveis", async (req,res) =>{
    try{
        if(Object.keys(req.body).length === 0){
            return res.json({ message: "Não é possivel adicionar um item nulo" })
        }
         await responsiblesController.insertResponsible(req.body)
         res.sendStatus(201)
    } catch (erro){
        return res.json("Erro:", erro)
    }
 })

 responsiblesRouter.patch("/responsaveis/:id", async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const rowsAffected = await responsiblesController.updateResponsible(id, { nome });
        res.json({ message: "responsavel atualizada com sucesso" });
    } catch (erro) {
        console.error("Erro ao atualizar responsavel:", erro);
        res.sendStatus(500);
    }
});

responsiblesRouter.delete("/responsaveis/:id", async (req, res) =>{
    try{
        await responsiblesController.deleteResponsible(req.params.id);
        res.sendStatus(204)
    } catch (erro){
        console.error("Erro ao atualizar responsavel:", erro);
        return res.sendStatus(500);
    }
})


module.exports = responsiblesRouter;