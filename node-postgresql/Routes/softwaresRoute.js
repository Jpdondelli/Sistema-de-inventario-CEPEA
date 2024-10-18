const express = require("express");
const softwaresRouter = express.Router();
const softwaresController = require("../controllers/softwaresController");

/* ----------------------CRUD Software------------------------ */

softwaresRouter.get("/softwares", async (req,res) =>{
    const softwares = await softwaresController.selectSoftwares()
    res.json(softwares)
})

softwaresRouter.get("/softwares/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const software = await softwaresController.selectSoftwareById(id);
        if (software.length === 0) {
            return res.json({ message: "Software não encontrado" });
        }
        res.json(software);
    } catch (erro) {
        console.log(erro)
        return res.json({ message: "Erro ao buscar Software por ID:", erro});
    }
});


softwaresRouter.post("/softwares", async (req,res) =>{
    try{
        if(Object.keys(req.body).length === 0){
            return res.json({ message: "Não é possivel adicionar um item nulo" })
        }
         await softwaresController.insertSoftware(req.body)
         res.sendStatus(201)
    } catch (erro){
         console.log("Erro:", erro)
         res.sendStatus(500)
    }
 })

 softwaresRouter.put("/softwares/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, modelo} = req.body;
    try {
        const rowsAffected = await softwaresController.updateSoftware(id, { nome, modelo});
        res.json({ message: "Software atualizado com sucesso" });
    } catch (erro) {
        return res.json("Erro ao atualizar Software:", erro);
    }
});

softwaresRouter.delete("/softwares/:id", async (req, res) =>{
    try{
        await softwaresController.deleteSoftware(req.params.id);
        res.sendStatus(204)
    } catch (erro){
        console.error("Erro ao atualizar Software:", erro);
        return res.sendStatus(500);
    }
})


module.exports = softwaresRouter;