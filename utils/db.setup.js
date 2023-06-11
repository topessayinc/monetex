const pool = require("../models/db.js");

const createAccountTable = ()=>{pool.query(`
    CREATE TABLE IF NOT EXISTS account (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        ballance FLOAT unsigned DEFAULT '0.0',
        email TEXT
        password TEXT,
        bonus INT unsigned,
        phone TEXT,
        accessKey TEXT,
        country TEXT,
        inviteLink TEXT,
        dateOfBirth TEXT,
        createdAt TEXT
    ) ENGINE=InnoDB;
    `, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data);
        }
    })
}

const createDepositTable=()=>{
    pool.query(`
    CREATE TABLE IF NOT EXISTS deposit (
        id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        amount FLOAT unsigned NOT NULL,
        currency TEXT NOT NULL,
        coin TEXT NOT NULL,
        accountId INT NOT NULL,
        walletAddress TEXT NOT NULL,
        imageProof TEXT NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT 0,
        createdAt TEXT
    ) ENGINE=InnoDB;
    `, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
}
const createDeletedDepositTable=()=>{
    pool.query(`
    CREATE TABLE IF NOT EXISTS deletedDeposit (
        id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        amount FLOAT unsigned NOT NULL,
        currency TEXT NOT NULL,
        coin TEXT NOT NULL,
        accountId INT NOT NULL,
        walletAddress TEXT NOT NULL,
        imageProof TEXT NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT 0,
        createdAt TEXT,
        deletedOn TEXT,
        deletedBy TEXT,
        reason TEXT
    ) ENGINE=InnoDB;
    `, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
}
const createInvestmentTable=()=>{
    pool.query(`
    CREATE TABLE IF NOT EXISTS investment (
        id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        amount FLOAT unsigned NOT NULL,
        plan TEXT NOT NULL,
        accountId INT NOT NULL,
        givenTimes INT NOT NULL DEFAULT '0',
        alive BOOLEAN NOT NULL,
        stepLimit INT unsigned NOT NULL,
        stepsTaken INT unsigned NOT NULL DEFAULT 1 ,
        createdAt TEXT
    ) ENGINE=InnoDB;
    `, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
}

const createReferalTable=()=>{
    pool.query(`
    CREATE TABLE IF NOT EXISTS referal (
        id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        link TEXT NOT NULL,
        date TEXT NOT NULL
    ) ENGINE=InnoDB;
    `, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
}

const createWithdrawTable=()=>{
    pool.query(`
    CREATE TABLE IF NOT EXISTS withdraw (
        id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        amount FLOAT unsigned NOT NULL,
        currency TEXT NOT NULL,
        coin TEXT NOT NULL,
        accountId INT NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT '0',
        completed BOOLEAN NOT NULL DEFAULT '0',
        createdAt TEXT,
        verifiedAt TEXT,
        walletAddress TEXT
    ) ENGINE=InnoDB;
    `, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
}

const createDeletedWithdrawTable=()=>{
    pool.query(`
    CREATE TABLE IF NOT EXISTS deletedWithdraw (
        id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        amount FLOAT unsigned NOT NULL,
        currency TEXT NOT NULL,
        coin TEXT NOT NULL,
        accountId INT NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT '0',
        completed BOOLEAN NOT NULL DEFAULT '0',
        createdAt TEXT,
        verifiedAt TEXT,
        walletAddress TEXT,
        deletedOn TEXT,
        deletedBy TEXT, 
        reason TEXT
    ) ENGINE=InnoDB;
    `, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
}

function setUpMonetextDb(){
    createAccountTable();
    createDepositTable();
    createInvestmentTable();
    createReferalTable();
    createWithdrawTable();
    createDeletedDepositTable();
    createDeletedWithdrawTable();
};

module.exports = setUpMonetextDb;