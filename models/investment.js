const pool = require("./db");



function create({amount, plan, accountId, stepLimit}, callBack){
    pool.query(`
    INSERT INTO investment (amount, plan, accountId, alive, stepLimit, createdAt) VALUES (?, ?, ?, ?, ?, ?)
    `,[amount, plan, accountId, true, stepLimit, new Date().toUTCString()],
    (err, data)=>{
        if(err){ callBack(err)}else{ callBack(null, data)};
    })
}

function find(callback){
    pool.query(
        `select * from investment`, 
        [],
        (err, result, fields)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function findById(id, callback){
    pool.query(
        `select * from investment where id = ?`,
        [id],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}
function findByAccount(accountId, callback){
    pool.query(
        `select * from investment where accountId = ?`,
        [accountId],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function updateSpecificInfo({id, info, value}, callback){
    pool.query(
        `update investment set ${info} = ? where id = ?`,
        [
            value,
            id
        ],
        (err, result )=>{
            if (err) return callback(err);
            return callback(null, result);
        }
    )
}

function kill(id, callBack){
    pool.query(
        `update investment set ${alive} = ${false} where id = ${id}`,
        [],
        (err, result)=>{
            callBack(err, result);
        }
    )
}
module.exports = {
    create, find, findById, updateSpecificInfo, kill, findByAccount
};