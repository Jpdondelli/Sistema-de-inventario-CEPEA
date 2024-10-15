const connect = require("../dbConnect")
/* CRUDE para usuarios */

async function selectUsers(){
    const client = await connect()
    const res = await client.query("SELECT * FROM inventario.usuario")
    return res.rows
}

async function selectUserById(id){
    const client = await connect()
    const res = await client.query(`SELECT * FROM inventario.usuario WHERE id=$1`, [id])
    return res.rows
}

async function insertUser(user){
    const client = await connect()
    const sql = "INSERT INTO inventario.usuario(nome, usuario, senha, role) VALUES ($1, $2, $3, $4)"
    const res = await client.query(sql, [user.nome, user.usuario, user.senha, user.role])
}

async function updateUser(id, user) {
    try {
        const client = await connect();
        const sql = "UPDATE inventario.usuario SET nome=$1, usuario=$2, senha=$3, role=$4 WHERE id=$5";
        const values = [user.nome, user.usuario, user.senha, user.role, id];
        const res = await client.query(sql, values);
        return res.rowCount;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.error;  
    }
}

async function deleteUser(id){
    try{
        const client = await connect()
        const sql = "DELETE FROM inventario.usuario WHERE id=$1"
        const values = [id]
        await client.query(sql,values)
    }catch  (erro){
        console.error("Erro ao deletar o usuário: ", erro)
        throw erro;
    }

}

module.exports = {
    selectUsers,
    selectUserById,
    insertUser,
    updateUser,
    deleteUser,
}