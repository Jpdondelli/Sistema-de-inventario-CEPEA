const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

/* ----------------------CRUD usuarios------------------------ */
userRouter.get("/usuarios", async (req, res) => {
    const usuarios = await userController.selectUsers();
    res.json(usuarios);
});

userRouter.get("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await userController.selectUserById(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.json(usuario);
    } catch (erro) {
        console.error("Erro ao buscar usuário por ID:", erro);
        res.sendStatus(500);
    }
});

userRouter.post("/usuarios", async (req, res) => {
    try {
        await userController.insertUser(req.body);
        res.sendStatus(201);
    } catch (erro) {
        console.log("Erro:", erro);
        res.sendStatus(500);
    }
});

userRouter.patch("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, usuario, senha, role } = req.body;
    try {
        await userController.updateUser(id, { nome, usuario, senha, role });
        res.json({ message: "Usuário atualizado com sucesso" });
    } catch (erro) {
        console.error("Erro ao atualizar usuário:", erro);
        res.sendStatus(500);
    }
});

userRouter.delete("/usuarios/:id", async (req, res) => {
    try {
        await userController.deleteUser(req.params.id);
        res.sendStatus(204);
    } catch (erro) {
        console.error("Erro ao atualizar usuário:", erro);
        return res.sendStatus(500);
    }
});

module.exports = userRouter;
