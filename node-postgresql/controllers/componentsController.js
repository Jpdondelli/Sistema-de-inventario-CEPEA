const connect = require("../dbConnect")
/* CRUDE para componentes */

async function selectComponents(){
    const client = await connect()
    const res = await client.query("SELECT * FROM inventario.componentes")
    return res.rows
}

async function selectComponentById(id){
    const client = await connect()
    const res = await client.query(`SELECT * FROM inventario.componentes WHERE id=$1`, [id])
    return res.rows
}

async function insertComponent(user){
    const client = await connect()
    const sql = "INSERT INTO inventario.componentes(nome, modelo) VALUES ($1, $2)"
    const res = await client.query(sql, [user.nome, user.modelo])
}

async function updateComponent(id, user) {
    try {
        const client = await connect();
        const sql = "UPDATE inventario.componentes SET nome=$1, modelo=$2 WHERE id=$3";
        const values = [user.nome, user.modelo, id];
        const res = await client.query(sql, values);
        return res.rowCount;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw error;  
    }
}

async function deleteComponent(id){
    try{
        const client = await connect()
        const sql = "DELETE FROM inventario.componentes WHERE id=$1"
        const values = [id]
        await client.query(sql,values)
    }catch  (erro){
        console.error("Erro ao deletar o usuário: ", erro)
        throw erro;
    }

}

module.exports = {
    selectComponents,
    selectComponentById,
    insertComponent,
    updateComponent,
    deleteComponent,
}