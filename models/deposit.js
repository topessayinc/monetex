const pool = require("./db");


function create({amount, currency, coin, accountId, walletAddress, imageProof}, callBack){
    pool.query(`
    INSERT INTO deposit (amount, currency, coin, accountId, walletAddress, imageProof, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)
    `,[amount, currency, coin, accountId, walletAddress, imageProof, new Date().toUTCString()],
    (err, data)=>{
        if(err){ callBack(err)}else{ callBack(null, data)};
    })
}

function find(callback){
    pool.query(
        `select * from deposit`, 
        [],
        (err, result, fields)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function findById(id, callback){
    pool.query(
        `select * from deposit where id  = ?`,
        [id],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}
function findByUserId(uid, callback){
    pool.query(
        `select * from deposit where accountId = ?`,
        [uid],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}
/**
 * 
 * @param {String} id 
 * @param {function} callback 
 */
function verify(id, callback){
    pool.query(`update deposit set verified = ? where id = ?`,[true, id], (err, data)=>{
        if(err){ callback(err)}else{ callback(null, data)};
    })
}

function _delete(id, callBack){
    pool.query(`DELETE FROM deposit WHERE id = ?`,[id], (err, data)=>{
        if(err){
            callBack(err)
        }else {
            callBack(null, data)
        }
    } )
}



module.exports = {
    create, find, findById, findByUserId, verify, delete: _delete
};

/*
here is a json String

[{"name":"mike","age":20,"amount":300},{"name":"ken","age":22,"amount":400},{"name":"ben","age":21,"amount":500},{"name":"brenda","age":19,"amount":700},{"name":"karen","age":22,"amount":600},{"name":"joy","age":23,"amount":900}]

make a d3 pie chart of the distribution of amount to each object in the array
*/