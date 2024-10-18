const express = require("express");
const equipmentsRouter = express.Router();
const equipmentsController = require("../controllers/equipmentsController");

/* ----------------------CRUD equipamentos------------------------ */
equipmentsRouter.get("/equipamentos", async (req, res) => {
    try {
        const equipamentos = await equipmentsController.selectEquipments();
        res.json(equipamentos);
    } catch (error) {
        return res.json({ message: error.message });
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
        return res.json({ message: "Erro ao buscar equipamento por ID:", erro});
    }
});

equipmentsRouter.post("/equipamentos", async (req, res) => {
    try {
        let dataRecieved = req.body;
        /* Verificação dos campos nulos */
        if(Object.keys(dataRecieved).length === 0){
            return res.status(411).json({ message: "Não é possivel adicionar um item nulo" })
        }
        if(dataRecieved.patrimonio != null && !dataRecieved.idresponsavel){
            return res.status(411).json({ message: "Erro: Não é possível adicionar um equipamento patrimoniado sem um responsável."}); 
        }
        if(dataRecieved.idproduto === 1 && dataRecieved.componentes !== 0){
            return res.status(500).json({ message: "Erro, não é possivel adicionar um computador sem suas especificações" })
        }
        if (dataRecieved.local == null){
            return res.status(500).json({ message: "Erro, o campo Local não pode ser nulo" })
        }
        if(dataRecieved.utilizador == null){
            return res.status(500).json({ message: "Erro, o campo Utilizador não pode ser nulo, caso não pertença a ninguém digite ROTATIVO"})
        } 
        if(dataRecieved.idproduto == null){
            return res.status(500).json({ message: "Erro o campo Tipo de produto nao pode ser nulo"})
        }
        if(dataRecieved.idprojeto == null){
            return res.status(500).json({ message: "Erro o campo Projeto nao pode ser nulo"})
        }
        if(dataRecieved.ativo == null){
            return res.status(500).json({ message: "Erro o campo Ativo nao pode ser nulo"})
        }
        /* Final da verificação */
        await equipmentsController.insertEquipment(req.body);
        return res.status(200).json({ message: "Sucesso ao cadastrar equipamento" })
    } catch (Error) {
        return res.status(500).json({ message: "Erro:", Error });
    }
});

equipmentsRouter.put("/equipamentos/:id", async (req, res) => {
    const { id } = req.params;
    const { nf, processo, idresponsavel, local, datacompra, utilizador, idmarca, codigodoacao, idproduto, patrimonio, idprojeto, ativo, servicetag, office, observacao, idmodelo, componentes} = req.body;
    try {
        await equipmentsController.updateEquipment(id, { nf, processo, idresponsavel, local, datacompra, utilizador, idmarca, codigodoacao, idproduto, patrimonio, idprojeto, ativo, servicetag, office, observacao, idmodelo, componentes});
        res.json({ message: "Equipamento atualizado com sucesso" });
    } catch (erro) {
        res.json({ message: "Erro ao atualizar equipamento:", erro }) ;
    }
});

equipmentsRouter.delete("/equipamentos/:id", async (req, res) => {
    try {
        await equipmentsController.deleteEquipment(req.params.id);
        res.json({ message: "Sucesso ao deletar equipamento"})
    } catch (erro) {
        console.error("Erro ao atualizar equipamento:", erro);
        return res.sendStatus(500);
    }
});

module.exports = equipmentsRouter;