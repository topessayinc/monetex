const pool = require("./db");
class Withdraw{
    /**
     * 
     * @param {Number} amount 
     * @param {String} currency 
     * @param {String} coin 
     * @param {Number} accountId 
     * @param {Number} walletAddress 
     */
    constructor(amount, currency, coin, accountId, walletAddress){
        this.amount = amount; this.currency = currency; this.coin = coin; this.accountId = accountId; this.walletAddress = walletAddress;
    }
}
/**
 * 
 * @param {Withdraw} param0 
 * @param {function} callBack 
 */
function create({amount, currency, coin, accountId, walletAddress, deletedBy, createdAt, reason, verified, completed}, callBack){
    pool.query(`
    INSERT INTO deletedwithdraw (amount, currency, coin, accountId, verified, completed, createdAt, walletAddress, deletedBy, deletedOn, reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,[amount, currency, coin, accountId, verified, completed, createdAt, walletAddress, deletedBy, new Date().toUTCString(), reason],
    (err, data)=>{
        if(err){ callBack(err)}else{ callBack(null, data)};
    })
}

function find(callback){
    pool.query(
        `select * from deletedwithdraw`, 
        [],
        (err, result, fields)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function findById(id, callback){
    pool.query(
        `select * from deletedwithdraw where id = ?`,
        [id],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result[0]);
        }
    )
}


function complete(id, callback){
    pool.query(`update deletedwithdraw set completed = ? where id = ?`,[true, id], (err, data)=>{
        if(err){ callback(err)}else{ callback(null, data)};
    })
}
function findByUserId(uid, callback){
    pool.query(
        `select * from deletedwithdraw where accountId = ?`,
        [uid],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}


module.exports = {
    create, find, findById, complete, findByUserId
};