const connect = require("../dbConnect")
/* CRUDE para usuarios */

async function selectEquipments(){
    const client = await connect()
    const res = await client.query("SELECT * FROM inventario.equipamentos")
    return res.rows
}

async function selectEquipmentById(id){
    const client = await connect()
    const res = await client.query(`SELECT * FROM inventario.equipamentos WHERE id=$1`, [id])
    return res.rows
}

async function insertEquipment(user) {
    const client = await connect();
    
    try {
        await client.query("BEGIN"); // Inicia uma transação

        // Inserir o equipamento e retornar o ID gerado
        const sql1 = `INSERT INTO inventario.equipamentos(nf, processo, idresponsavel, local, datacompra, utilizador, idmarca, codigodoacao, idproduto, patrimonio, idprojeto, ativo, servicetag, office, observacao, idmodelo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id`;

        const res = await client.query(sql1, [ user.nf, user.processo, user.idresponsavel, user.local, user.datacompra, user.utilizador, user.idmarca, user.codigodoacao, user.idproduto, user.patrimonio, user.idprojeto, user.ativo, user.servicetag, user.office, user.observacao, user.idmodelo]);

        const equipmentId = res.rows[0].id; // Obter o ID do equipamento inserido

        // Usar o ID do equipamento para inserir na tabela de relação
        const componentes = user.componentes; // Supondo que é um array de componentes
        const sql2 = `INSERT INTO inventario.depara_equipamento_componentes(id_componentes, id_equipamentos) VALUES ($1, $2)`;

        for (const componente of componentes) {
            await client.query(sql2, [componente, equipmentId]);
        }

        await client.query("COMMIT"); // Confirma a transação
        return equipmentId; // Retornar o ID do novo equipamento inserido
    } catch (error) {
        await client.query("ROLLBACK"); // Reverte a transação em caso de erro
        throw error; // Lança o erro para tratamento posterior
    }
}



async function updateEquipment(id, user) {
    const client = await connect();

    try {
        // Início da transação
        await client.query('BEGIN');

        // Atualiza o equipamento
        const sqlUpdate1 = `
            UPDATE inventario.equipamentos 
            SET 
                nf = $1, processo = $2, idresponsavel = $3, local = $4, datacompra = $5, 
                utilizador = $6, idmarca = $7, codigodoacao = $8, idproduto = $9, 
                patrimonio = $10, idprojeto = $11, ativo = $12, servicetag = $13, 
                office = $14, observacao = $15, idmodelo = $16 
            WHERE id = $17
        `;
        const valuesUpdate1 = [
            user.nf, user.processo, user.idresponsavel, user.local, user.datacompra,
            user.utilizador, user.idmarca, user.codigodoacao, user.idproduto,
            user.patrimonio, user.idprojeto, user.ativo, user.servicetag, 
            user.office, user.observacao, user.idmodelo, id
        ];

        await client.query(sqlUpdate1, valuesUpdate1);

        const sqlUpdate2 = `UPDATE inventario.depara_equipamento_componentes SET id_componentes = $1 WHERE id_equipamentos = $2`;

        const componentsUpdated = user.componentes

        console.log("componentes: ", componentsUpdated)

        await client.query(sqlUpdate2, [componentsUpdated, id]);

        await client.query('COMMIT');

        return { message: "Equipamento atualizado com sucesso" };
    } catch (error) {

        await client.query('ROLLBACK');
        console.error("Erro ao atualizar equipamento:", error);
        throw error;
    } finally {
        client.release();
    }
}

async function deleteEquipment(id){
    try{
        const client = await connect()
        const sql = "DELETE FROM inventario.equipamentos WHERE id=$1"
        const values = [id]
        await client.query(sql,values)
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