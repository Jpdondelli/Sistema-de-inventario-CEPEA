const connect = require("../dbConnect")
/* CRUDE para modelos */

async function selectModels(){
    const client = await connect()
    const res = await client.query("SELECT * FROM inventario.modelo")
    return res.rows
}

async function selectModelById(id){
    const client = await connect()
    const res = await client.query(`SELECT * FROM inventario.modelo WHERE id=$1`, [id])
    return res.rows
}

async function insertModel(user){
    const client = await connect()
    const sql = "INSERT INTO inventario.modelo(nome, id_marca) VALUES ($1, $2)"
    const res = await client.query(sql, [user.nome, user.id_marca])
}

async function updateModel(id, user) {
    try {
        const client = await connect();
        const sql = "UPDATE inventario.modelo SET nome=$1 id_marca=$2 WHERE id=$3";
        const values = [user.nome, user.id_marca, id];
        const res = await client.query(sql, values);
        return res.rowCount;
    } catch (error) {
        console.error("Erro ao atualizar modelo:", error);
        throw error;  
    }
}

async function deleteModel(id){
    try{
        const client = await connect()
        const sql = "DELETE FROM inventario.modelo WHERE id=$1"
        const values = [id]
        await client.query(sql,values)
    }catch  (erro){
        console.error("Erro ao deletar o modelo: ", erro)
        throw erro;
    }

}


    
module.exports = {    
    selectModels,
    selectModelById,
    insertModel,
    updateModel,
    deleteModel,
}