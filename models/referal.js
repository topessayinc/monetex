const pool = require("./db");


function create(link, callBack){
    pool.query(`
    INSERT INTO referal (link, date) VALUES (?,?)
    `,[link, new Date().toUTCString()],
    (err, data)=>{
        if(err){ callBack(err)}else{ callBack(null, data)};
    })
}

function find(callback){
    pool.query(
        `select * from referal`, 
        [],
        (err, result, fields)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}
function findByUserId(uid, callback){
    pool.query(
        `select * from referal where link = ?`,
        [uid],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}
function findById(id, callback){
    pool.query(
        `select * from referal where id = ?`,
        [uid],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result[0]);
        }
    )
}

module.exports = {
    create, find, findById, findByUserId
};