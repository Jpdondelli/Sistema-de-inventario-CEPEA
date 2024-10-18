const connect = require("../dbConnect")
/* CRUDE para softwares */

async function selectSoftwares(){
    const client = await connect()
    const res = await client.query("SELECT * FROM inventario.softwares")
    return res.rows
}

async function selectSoftwareById(id){
    const client = await connect()
    const res = await client.query(`SELECT * FROM inventario.softwares WHERE id=$1`, [id])
    return res.rows
}

async function insertSoftware(user){
    const client = await connect()
    const sql = "INSERT INTO inventario.softwares(nome) VALUES ($1)"
    const res = await client.query(sql, [user.nome])
}

async function updateSoftware(id, user) {
    try {
        const client = await connect();
        const sql = "UPDATE inventario.softwares SET nome=$1 WHERE id=$2";
        const values = [user.nome, id];
        const res = await client.query(sql, values);
        return res.rowCount;
    } catch (error) {
        console.error("Erro ao atualizar software:", error);
        throw error;  
    }
}

async function deleteSoftware(id){
    try{
        const client = await connect()
        const sql = "DELETE FROM inventario.softwares WHERE id=$1"
        const values = [id]
        await client.query(sql,values)
    }catch  (erro){
        console.error("Erro ao deletar o software: ", erro)
        throw erro;
    }

}

module.exports = {
    selectSoftwares,
    selectSoftwareById,
    insertSoftware,
    updateSoftware,
    deleteSoftware,
}