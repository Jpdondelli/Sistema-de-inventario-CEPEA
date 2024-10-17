const express = require("express");
const projectsRouter = express.Router();
const projectsController = require("../controllers/projectsController");

/* ----------------------CRUD marca------------------------ */

projectsRouter.get("/projetos", async (req,res) =>{
    const marcas = await projectsController.selectProjects()
    res.json(marcas)
})

projectsRouter.get("/projetos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const projeto = await projectsController.selectProjectById(id);
        if (projeto.length === 0) {
            return res.json({ message: "Projeto não encontrado" });
        }
        res.json(usuario);
    } catch (erro) {
        return res.json({ message: "Erro ao buscar projeto por ID:"});
    }
});


projectsRouter.post("/projetos", async (req,res) =>{
    try{
        if(Object.keys(req.body).length === 0){
            return res.json({ message: "Não é possivel adicionar um item nulo" })
        }
         await projectsController.insertProject(req.body)
         res.sendStatus(201)
    } catch (erro){
        return res.json("Erro:", erro)
    }
 })

 projectsRouter.put("/projetos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const rowsAffected = await projectsController.updateProject(id, { nome });
        res.json({ message: "marca atualizada com sucesso" });
    } catch (erro) {
        console.error("Erro ao atualizar projeto:", erro);
        res.sendStatus(500);
    }
});

projectsRouter.delete("/projetos/:id", async (req, res) =>{
    try{
        await projectsController.deleteProject(req.params.id);
        res.sendStatus(204)
    } catch (erro){
        console.error("Erro ao atualizar marca:", erro);
        return res.sendStatus(500);
    }
})


module.exports = projectsRouter;