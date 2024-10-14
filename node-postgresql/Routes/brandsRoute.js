const express = require("express");
const brandsRouter = express.Router();
const brandsController = require("../controllers/brandsController");

/* ----------------------CRUD marca------------------------ */

brandsRouter.get("/marcas", async (req,res) =>{
    const marcas = await brandsController.selectBrands()
    res.json(marcas)
})

brandsRouter.get("/marcas/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const marcas = await brandsController.selectBrandById(id);
        if (!marcas) {
            return res.status(404).json({ message: "marca não encontrada" });
        } 
        res.json(marcas);
    } catch (erro) {
        console.error("Erro ao buscar marca por ID:", erro);
        res.sendStatus(500);
    }
});


brandsRouter.post("/marcas", async (req,res) =>{
    try{
         await brandsController.insertBrand(req.body)
         res.sendStatus(201)
    } catch (erro){
         console.log("Erro:", erro)
         res.sendStatus(500)
    }
 })

 brandsRouter.patch("/marcas/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, modelo} = req.body;
    try {
        const rowsAffected = await brandsController.updateBrand(id, { nome, modelo});
        res.json({ message: "marca atualizada com sucesso" });
    } catch (erro) {
        console.error("Erro ao atualizar marca:", erro);
        res.sendStatus(500);
    }
});

brandsRouter.delete("/marcas/:id", async (req, res) =>{
    try{
        await brandsController.deleteBrand(req.params.id);
        res.sendStatus(204)
    } catch (erro){
        console.error("Erro ao atualizar marca:", erro);
        return res.sendStatus(500);
    }
})


module.exports = brandsRouter;