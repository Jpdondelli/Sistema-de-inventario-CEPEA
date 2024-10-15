const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

/* ----------------------CRUD usuarios------------------------ */
userRouter.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await userController.selectUsers();
        res.json(usuarios);
        
    } catch (error) {
      return res.json({ message: error.message })
    }
});

userRouter.get("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await userController.selectUserById(id);
        if (usuario.length === 0) {
            return res.json({ message: "Usuário não encontrado" });
        }
        res.json(usuario);
    } catch (erro) {
        return res.json({ message: "Erro ao buscar usuário por ID:"});
    }
});

userRouter.post("/usuarios", async (req, res) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.json({ message: "Não é possivel adicionar um item nulo" })
        }
        await userController.insertUser(req.body);
        res.sendStatus(201);
    } catch (erro) {
        return res.json("Erro:", erro);
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
