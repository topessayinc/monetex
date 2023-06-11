const pool = require("./db");
const gen = require("../utils/num2text");

function create({name, email, password, phone, inviteLink, country, dateOfBirth}, callBack){
    let d=gen.generateKey("");
    pool.query(`
    INSERT INTO account (name, email, password, phone, bonus, accessKey, inviteLink, country, dateOfBirth, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,[name, email, password, phone, 0, d, inviteLink, country, dateOfBirth, new Date().toUTCString()],
    (err, data)=>{
        if(err){ callBack(err)}else{ callBack(null, data)};
    })
}

function find(callback){
    pool.query(
        `select * from account`, 
        [],
        (err, result, fields)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function findById(id, callback){
    
    pool.query(
        `select * from account where id = ?`,
        [id],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function findByEmail(email, callback){
    pool.query(
        `select * from account where email = ?`,
        [email],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function findByPhone(phone, callback){
    pool.query(
        `select * from account where phone = ?`,
        [phone],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function findByReferalLink(link, callback){
    pool.query(
        `select * from account where referalLink = ?`,
        [link],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result[0]);
        }
    )
}

function updateSpecificInfo({id, info, value}, callback){
    pool.query(
        `update account set ${info} = ? where id = ?`,
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

function deleteAccount(id, callback){
    pool.query(
        `delete from account where id = ?`,
        [
            id
        ],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

function deposit(id, amount, callback){
    findById(id, (err, data)=>{
        if(err ){
            return callback(err);
        }else{
            pool.query(`update account set ballance = ? where id = ?`, [data[0].ballance+amount, id], (err, success)=>{
                if(err){
                    return callback(err);
                }else{
                    return callback(null, success);
                }
            })
        }
    })
}

function deduct(id, amount, callback){
    findById(id, (err, data)=>{
        if(err ){
            return callback(err);
        }else{
            console.log(data);
            pool.query(`update account set ballance = ? where id = ?`, [data[0].ballance-amount, id], (err, success)=>{
                if(err){
                    return callback(err);
                }else{
                    return callback(null, success);
                }
            })
        }
    })
}
module.exports = {
    create, find, findById, findByEmail, updateSpecificInfo, deleteAccount, findByReferalLink, deposit, deduct, findByPhone
};