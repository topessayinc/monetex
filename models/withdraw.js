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
function create({amount, currency, coin, accountId, walletAddress}, callBack){
    pool.query(`
    INSERT INTO withdraw (amount, currency, coin, accountId, verified, completed, createdAt, walletAddress) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,[amount, currency, coin, accountId, false, false, new Date().toUTCString(), walletAddress],
    (err, data)=>{
        if(err){ callBack(err)}else{ callBack(null, data)};
    })
}

function find(callback){
    pool.query(
        `select * from withdraw`, 
        [],
        (err, result, fields)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function findById(id, callback){
    pool.query(
        `select * from withdraw where id = ?`,
        [id],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result[0]);
        }
    )
}

function verify(id, callback){
    pool.query(`update withdraw set verified = ?, verifiedAt = ? where id = ?`,[true, new Date().toUTCString(), id], (err, data)=>{
        if(err){ callback(err)}else{ callback(null, data)};
    })
}

function complete(id, callback){
    pool.query(`update withdraw set completed = ? where id = ?`,[true, id], (err, data)=>{
        if(err){ callback(err)}else{ callback(null, data)};
    })
}
function findByUserId(uid, callback){
    pool.query(
        `select * from withdraw where accountId = ?`,
        [uid],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function _delete(id, callBack){
    pool.query(`DELETE FROM withdraw WHERE id = ?`,[id], (err, data)=>{
        if(err){
            callBack(err)
        }else {
            callBack(null, data)
        }
    } )
}
module.exports = {
    create, find, findById, verify, complete, findByUserId, delete: _delete
};