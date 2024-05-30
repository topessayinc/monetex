const pool = require("../models/db.js");

const createAccountTable = () => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS account (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            balance FLOAT UNSIGNED DEFAULT '0.0',
            email VARCHAR(255),
            password VARCHAR(255),
            bonus INT UNSIGNED,
            phone VARCHAR(255),
            accessKey VARCHAR(255),
            country VARCHAR(255),
            inviteLink VARCHAR(255),
            dateOfBirth VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
    `, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Table created successfully:', data);
        }
    });
};


const createDepositTable=()=>{
    pool.query(`
    CREATE TABLE IF NOT EXISTS deposit (
        id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        amount FLOAT unsigned NOT NULL,
        currency VARCHAR(255) NOT NULL,
        coin VARCHAR(255) NOT NULL,
        accountId INT NOT NULL,
        walletAddress VARCHAR(255) NOT NULL,
        imageProof VARCHAR(255) NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT 0,
        createdAt VARCHAR(255)
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
        currency VARCHAR(255) NOT NULL,
        coin VARCHAR(255) NOT NULL,
        accountId INT NOT NULL,
        walletAddress VARCHAR(255) NOT NULL,
        imageProof VARCHAR(255) NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT 0,
        createdAt VARCHAR(255),
        deletedOn VARCHAR(255),
        deletedBy VARCHAR(255),
        reason VARCHAR(255)
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
        plan VARCHAR(255) NOT NULL,
        accountId INT NOT NULL,
        givenTimes INT NOT NULL DEFAULT '0',
        alive BOOLEAN NOT NULL,
        stepLimit INT unsigned NOT NULL,
        stepsTaken INT unsigned NOT NULL DEFAULT 1 ,
        createdAt VARCHAR(255)
    ) ENGINE=InnoDB;
    `, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
}

const createReferralTable=()=>{
    pool.query(`
    CREATE TABLE IF NOT EXISTS referal (
        id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        link VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL
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
        currency VARCHAR(255) NOT NULL,
        coin VARCHAR(255) NOT NULL,
        accountId INT NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT '0',
        completed BOOLEAN NOT NULL DEFAULT '0',
        createdAt VARCHAR(255),
        verifiedAt VARCHAR(255),
        walletAddress VARCHAR(255)
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
        currency VARCHAR(255) NOT NULL,
        coin VARCHAR(255) NOT NULL,
        accountId INT NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT '0',
        completed BOOLEAN NOT NULL DEFAULT '0',
        createdAt VARCHAR(255),
        verifiedAt VARCHAR(255),
        walletAddress VARCHAR(255),
        deletedOn VARCHAR(255),
        deletedBy VARCHAR(255), 
        reason VARCHAR(255)
    ) ENGINE=InnoDB;
    `, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
}

function setUpMonetexDb(){
    createAccountTable();
    createDepositTable();
    createInvestmentTable();
    createReferralTable();
    createWithdrawTable();
    createDeletedDepositTable();
    createDeletedWithdrawTable();
};

module.exports = setUpMonetexDb;