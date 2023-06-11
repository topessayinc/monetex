const pool = require("./db");


function create({amount, currency, coin, accountId, walletAddress, createdAt, imageProof, deletedBy, reason}, callBack){
    pool.query(`
    INSERT INTO deleteddeposit (amount, currency, coin, accountId, walletAddress, imageProof, createdAt, deletedBy, deletedOn, reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,[amount, currency, coin, accountId, walletAddress, imageProof, createdAt, deletedBy, new Date().toUTCString(), reason],
    (err, data)=>{
        if(err){ callBack(err)}else{ callBack(null, data)};
    })
}

function find(callback){
    pool.query(
        `select * from deleteddeposit`, 
        [],
        (err, result, fields)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function findById(id, callback){
    pool.query(
        `select * from deleteddeposit where id  = ?`,
        [id],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}
function findByUserId(uid, callback){
    pool.query(
        `select * from deleteddeposit where accountId = ?`,
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
    pool.query(`update deleteddeposit set verified = ? where id = ?`,[true, id], (err, data)=>{
        if(err){ callback(err)}else{ callback(null, data)};
    })
}

module.exports = {
    create, find, findById, findByUserId, verify
};