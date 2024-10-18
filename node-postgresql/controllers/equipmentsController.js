const connect = require("../dbConnect")
/* CRUDE para Equipamentos */

async function selectEquipments() {
    const client = await connect();
    const res = await client.query(`SELECT inventario.equipamentos.*, inventario.depara_equipamento_componentes.id_componentes FROM inventario.equipamentos INNER JOIN inventario.depara_equipamento_componentes ON inventario.equipamentos.id = inventario.depara_equipamento_componentes.id_equipamentos;`);
    return res.rows;
}

async function selectEquipmentById(id){
    const client = await connect()
    const res = await client.query(`SELECT inventario.equipamentos.*, inventario.depara_equipamento_componentes.id_componentes FROM inventario.equipamentos INNER JOIN inventario.depara_equipamento_componentes ON inventario.equipamentos.id = inventario.depara_equipamento_componentes.id_equipamentos WHERE inventario.equipamentos.id=$1;`, [id])
    return res.rows
}

async function insertEquipment(user) {
    const client = await connect();

    try {
        const sql1 = `INSERT INTO inventario.equipamentos (nf, processo, idresponsavel, local, datacompra, utilizador, idmarca, codigodoacao, idproduto, patrimonio, idprojeto, ativo, servicetag, observacao, idmodelo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id, idproduto, patrimonio`;

        const res = await client.query(sql1, [ user.nf, user.processo, user.idresponsavel, user.local, user.datacompra, user.utilizador, user.idmarca, user.codigodoacao, user.idproduto, user.patrimonio, user.idprojeto, user.ativo, user.servicetag, user.observacao, user.idmodelo]);

        const equipmentId = res.rows[0].id; 
        
        if(user.idproduto === 1 && user.componentes !== 0) {
            const sql2 = "INSERT INTO inventario.depara_equipamento_componentes(id_componentes, id_equipamentos) VALUES ($1, $2)";
            for (const componente of user.componentes) {
                await client.query(sql2, [componente, equipmentId]);
            }
        }

        console.log(user.id)

        if(user.idsoftware !== null){
            const sql3 = "INSERT INTO inventario.depara_equipamentos_softwares(id_software, id_equipamento, licenca) VALUES ($1, $2, $3)";
            for(const software of user.idsoftware){
                await client.query(sql3, [ software, equipmentId, user.licenca])
            }
        }



    } catch (erro) {
        
        console.error("Erro ao inserir equipamento", erro);
        return erro;
    }
}


async function updateEquipment(id, user) {
    const client = await connect();

    try {
        // Início da transação
        await client.query('BEGIN');

        const sqlUpdate1 = `UPDATE inventario.equipamentos SET nf = $1, processo = $2, idresponsavel = $3, local = $4, datacompra = $5, utilizador = $6, idmarca = $7, codigodoacao = $8, idproduto = $9, patrimonio = $10, idprojeto = $11, ativo = $12, servicetag = $13, idsoftware = $14, observacao = $15, idmodelo = $16 WHERE id = $17`;
        const valuesUpdate1 = [user.nf, user.processo, user.idresponsavel, user.local, user.datacompra,user.utilizador, user.idmarca, user.codigodoacao, user.idproduto,user.patrimonio, user.idprojeto, user.ativo, user.servicetag, user.idsoftware, user.observacao, user.idmodelo, id];
        await client.query(sqlUpdate1, valuesUpdate1);

        // Remover componentes antigos (caso necessário)
        const sqlDelete = `DELETE FROM inventario.depara_equipamento_componentes WHERE id_equipamentos = $1`;
        await client.query(sqlDelete, [id]);

          // Inserir novos componentes (relação)
        const sqlInsert = `
        INSERT INTO inventario.depara_equipamento_componentes (id_componentes, id_equipamentos) 
        VALUES ($1, $2)`;
    
    for (const componente of user.componentes) {
        await client.query(sqlInsert, [componente, id]);
    }

        await client.query('COMMIT');



        return { message: "Equipamento atualizado com sucesso" };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Erro ao atualizar equipamento:", error);
        res.json({ message: "Erro", error })
    } 
}

async function deleteEquipment(id){
    try{
        const client = await connect()
        const sql2 = "DELETE FROM inventario.depara_equipamento_componentes WHERE id_equipamentos=$1"
        const values2 = [id]
        await client.query(sql2, values2)

        const sql1 = "DELETE FROM inventario.equipamentos WHERE id=$1"
        const values1 = [id]
        await client.query(sql1,values1)

        return ({ message: "Sucesso ao atualizar equipamento" })
    }catch  (erro){
        console.error("Erro ao deletar o equipamento: ", erro)
        throw erro;
    }

}

module.exports = {
    selectEquipments,
    selectEquipmentById,
    insertEquipment,
    updateEquipment,
    deleteEquipment,
}