const express = require("express");
const equipmentsRouter = express.Router();
const equipmentsController = require("../controllers/equipmentsController");

/* ----------------------CRUD equipamentos------------------------ */
equipmentsRouter.get("/equipamentos", async (req, res) => {
    try {
        const equipamentos = await equipmentsController.selectEquipments();
        res.json(equipamentos);
        
    } catch (error) {
      return res.json({ message: error.message })
    }
});

equipmentsRouter.get("/equipamentos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await equipmentsController.selectEquipmentById(id);
        if (usuario.length === 0) {
            return res.json({ message: "Equipamento não encontrado" });
        }
        res.json(usuario);
    } catch (erro) {
        return res.json({ message: "Erro ao buscar equipamento por ID:"});
    }
});

equipmentsRouter.post("/equipamentos", async (req, res) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.json({ message: "Não é possivel adicionar um item nulo" })
        }
        await equipmentsController.insertEquipment(req.body);
        res.sendStatus(201);
    } catch (erro) {
        return res.status(500).json({ message: "Erro:", erro });
    }
});

equipmentsRouter.patch("/equipamentos/:id", async (req, res) => {
    const { id } = req.params;
    const { nf, processo, idresponsavel, local, datacompra, utilizador, idmarca, codigodoacao, idproduto, patrimonio, idprojeto, ativo, servicetag, office, observacao, idmodelo, componentes} = req.body;
    try {
        await equipmentsController.updateEquipment(id, { nf, processo, idresponsavel, local, datacompra, utilizador, idmarca, codigodoacao, idproduto, patrimonio, idprojeto, ativo, servicetag, office, observacao, idmodelo, componentes});
        res.json({ message: "Equipamento atualizado com sucesso" });
    } catch (erro) {
        console.error("Erro ao atualizar equipamento:", erro);
        res.sendStatus(500);
    }
});

equipmentsRouter.delete("/equipamentos/:id", async (req, res) => {
    try {
        await equipmentsController.deleteEquipment(req.params.id);
        res.sendStatus(204);
    } catch (erro) {
        console.error("Erro ao atualizar equipamento:", erro);
        return res.sendStatus(500);
    }
});

module.exports = equipmentsRouter;