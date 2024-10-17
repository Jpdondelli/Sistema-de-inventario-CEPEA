const express = require("express");
const componentsRouter = express.Router();
const componentsController = require("../controllers/componentsController");

/* ----------------------CRUD componentes------------------------ */
componentsRouter.get("/componentes", async (req,res) =>{
    const componentes = await componentsController.selectComponents()
    res.json(componentes)
})

componentsRouter.get("/componentes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const componente = await componentsController.selectComponentById(id);
        if (componente.length === 0) {
            return res.json({ message: "Componente não encontrado" });
        }
        res.json(usuario);
    } catch (erro) {
        return res.json({ message: "Erro ao buscar componente por ID:"});
    }
});


componentsRouter.post("/componentes", async (req,res) =>{
    try{
        if(Object.keys(req.body).length === 0){
            return res.json({ message: "Não é possivel adicionar um item nulo" })
        }
         await componentsController.insertComponent(req.body)
         res.sendStatus(201)
    } catch (erro){
         console.log("Erro:", erro)
         res.sendStatus(500)
    }
 })

 componentsRouter.put("/componentes/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, modelo} = req.body;
    try {
        const rowsAffected = await componentsController.updateComponent(id, { nome, modelo});
        res.json({ message: "Componente atualizado com sucesso" });
    } catch (erro) {
        return res.json("Erro ao atualizar componente:", erro);
    }
});

componentsRouter.delete("/componentes/:id", async (req, res) =>{
    try{
        await componentsController.deleteComponent(req.params.id);
        res.sendStatus(204)
    } catch (erro){
        console.error("Erro ao atualizar usuário:", erro);
        return res.sendStatus(500);
    }
})

module.exports = componentsRouter