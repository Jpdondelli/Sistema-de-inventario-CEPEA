const connect = require("../dbConnect")
/* CRUDE para Projeto */

async function selectProjects(){
    const client = await connect()
    const res = await client.query("SELECT * FROM inventario.projeto")
    return res.rows
}

async function selectProjectById(id){
    const client = await connect()
    const res = await client.query(`SELECT * FROM inventario.projeto WHERE id=$1`, [id])
    return res.rows
}

async function insertProject(user){
    const client = await connect()
    const sql = "INSERT INTO inventario.projeto(nome) VALUES ($1)"
    const res = await client.query(sql, [user.nome])
}

async function updateProject(id, user) {
    try {
        const client = await connect();
        const sql = "UPDATE inventario.projeto SET nome=$1 WHERE id=$2";
        const values = [user.nome, id];
        const res = await client.query(sql, values);
        return res.rowCount;
    } catch (error) {
        console.error("Erro ao atualizar projeto:", error);
        throw error;  
    }
}

async function deleteProject(id){
    try{
        const client = await connect()
        const sql = "DELETE FROM inventario.projeto WHERE id=$1"
        const values = [id]
        await client.query(sql,values)
    }catch  (erro){
        console.error("Erro ao deletar o projeto: ", erro)
        throw erro;
    }

}

module.exports = {
    selectProjects,
    selectProjectById,
    insertProject,
    updateProject,
    deleteProject,
}