const connect = require("../dbConnect")
/* CRUDE para Responsavel */

async function selectResponsibles(){
    const client = await connect()
    const res = await client.query("SELECT * FROM inventario.responsavel")
    return res.rows
}

async function selectResponsibleById(id){
    const client = await connect()
    const res = await client.query(`SELECT * FROM inventario.responsavel WHERE id=$1`, [id])
    return res.rows
}

async function insertResponsible(user){
    const client = await connect()
    const sql = "INSERT INTO inventario.responsavel(nome) VALUES ($1)"
    const res = await client.query(sql, [user.nome])
}

async function updateResponsible(id, user) {
    try {
        const client = await connect();
        const sql = "UPDATE inventario.responsavel SET nome=$1 WHERE id=$2";
        const values = [user.nome, id];
        const res = await client.query(sql, values);
        return res.rowCount;
    } catch (error) {
        console.error("Erro ao atualizar responsavel:", error);
        throw error;  
    }
}

async function deleteResponsible(id){
    try{
        const client = await connect()
        const sql = "DELETE FROM inventario.responsavel WHERE id=$1"
        const values = [id]
        await client.query(sql,values)
    }catch  (erro){
        console.error("Erro ao deletar o responsavel: ", erro)
        throw erro;
    }

}

module.exports = {
    selectResponsibles,
    selectResponsibleById,
    insertResponsible,
    updateResponsible,
    deleteResponsible,
}