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
        const marca = await brandsController.selectBrandById(id);
        if (marca.length === 0) {
            return res.json({ message: "Marca não encontrado" });
        }
        res.json(usuario);
    } catch (erro) {
        return res.json({ message: "Erro ao buscar marca por ID:"});
    }
});


brandsRouter.post("/marcas", async (req,res) =>{
    try{
        if(Object.keys(req.body).length === 0){
            return res.json({ message: "Não é possivel adicionar um item nulo" })
        }
         await brandsController.insertBrand(req.body)
         res.sendStatus(201)
    } catch (erro){
         console.log("Erro:", erro)
         res.sendStatus(500)
    }
 })

 brandsRouter.put("/marcas/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, modelo} = req.body;
    try {
        const rowsAffected = await brandsController.updateBrand(id, { nome, modelo});
        res.json({ message: "marca atualizada com sucesso" });
    } catch (erro) {
        return res.json("Erro ao atualizar marca:", erro);
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