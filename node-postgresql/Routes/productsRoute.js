const express = require("express");
const productsRouter = express.Router();
const productsController = require("../controllers/productsController");

/* ----------------------CRUD usuarios------------------------ */
productsRouter.get("/produtos", async (req, res) => {
    const usuarios = await productsController.selectProducts();
    res.json(usuarios);
});

productsRouter.get("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await productsController.selectProductById(id);
        if (produto.length === 0) {
            return res.json({ message: "Produto não encontrado" });
        }
        res.json(usuario);
    } catch (erro) {
        return res.json({ message: "Erro ao buscar produto por ID:"});
    }
});


productsRouter.post("/produtos", async (req, res) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.json({ message: "Não é possivel adicionar um item nulo" })
        }
        await productsController.insertProduct(req.body);
        res.sendStatus(201);
    } catch (erro) {
        return res.json("Erro:", erro);
    }
});

productsRouter.patch("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    const { setor } = req.body;
    try {
        await productsController.updateProduct(id, { setor });
        res.json({ message: "Produto atualizado com sucesso" });
    } catch (erro) {
        console.error("Erro ao atualizar produto:", erro);
        res.sendStatus(500);
    }
});

productsRouter.delete("/produtos/:id", async (req, res) => {
    try {
        await productsController.deleteProduct(req.params.id);
        res.sendStatus(204);
    } catch (erro) {
        console.error("Erro ao atualizar produto:", erro);
        return res.sendStatus(500);
    }
});

module.exports = productsRouter;
