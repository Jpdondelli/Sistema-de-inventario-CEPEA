const connect = require("../dbConnect")
/* CRUDE para marcas */

async function selectBrands(){
    const client = await connect()
    const res = await client.query("SELECT * FROM inventario.marca")
    return res.rows
}

async function selectBrandById(id){
    const client = await connect()
    const res = await client.query(`SELECT * FROM inventario.marca WHERE id=$1`, [id])
    return res.rows
}

async function insertBrand(user){
    const client = await connect()
    const sql = "INSERT INTO inventario.marca(nome) VALUES ($1)"
    const res = await client.query(sql, [user.nome])
}

async function updateBrand(id, user) {
    try {
        const client = await connect();
        const sql = "UPDATE inventario.marca SET nome=$1 WHERE id=$2";
        const values = [user.nome, id];
        const res = await client.query(sql, values);
        return res.rowCount;
    } catch (error) {
        console.error("Erro ao atualizar marca:", error);
        throw error;  
    }
}

async function deleteBrand(id){
    try{
        const client = await connect()
        const sql = "DELETE FROM inventario.marca WHERE id=$1"
        const values = [id]
        await client.query(sql,values)
    }catch  (erro){
        console.error("Erro ao deletar o marca: ", erro)
        throw erro;
    }

}

module.exports = {
    selectBrands,
    selectBrandById,
    insertBrand,
    updateBrand,
    deleteBrand,
}