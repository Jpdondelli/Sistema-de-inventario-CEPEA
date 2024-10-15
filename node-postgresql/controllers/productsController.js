const connect = require("../dbConnect")
/* CRUDE para produtos */

async function selectProducts(){
    const client = await connect()
    const res = await client.query("SELECT * FROM inventario.produto")
    return res.rows
}

async function selectProductById(id){
    const client = await connect()
    const res = await client.query(`SELECT * FROM inventario.produto WHERE id=$1`, [id])
    return res.rows
}

async function insertProduct(user){
    const client = await connect()
    const sql = "INSERT INTO inventario.produto(setor) VALUES ($1)"
    const res = await client.query(sql, [user.setor])
}

async function updateProduct(id, user) {
    try {
        const client = await connect();
        const sql = "UPDATE inventario.produto SET setor=$1 WHERE id=$2";
        const values = [user.setor, id];
        const res = await client.query(sql, values);
        return res.rowCount;
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        throw error;  
    }
}

async function deleteProduct(id){
    try{
        const client = await connect()
        const sql = "DELETE FROM inventario.produto WHERE id=$1"
        const values = [id]
        await client.query(sql,values)
    }catch  (erro){
        console.error("Erro ao deletar o produto: ", erro)
        throw erro;
    }

}

module.exports = {
    selectProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}