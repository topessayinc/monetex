const deposit = require("../models/deposit");
const account = require("../models/account");
const deletedDeposit = require('../models/deleted.deposit')
const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs')
router.get('/', (req, res)=>{
    res.render('deposit');
})
const toTimeStamp= d=>{
    let str = '';
    str += d.toLocaleDateString().split('/').join('_');
    str+= '__'+ d.toLocaleTimeString().split(' ')[0].split(':').join('_');
    return str;
}
router.post("/", (req, res)=>{ 
    let {amount, coin, accountId, walletAddress} = req.body;
    if(!req.files){
        return res.status(400).json({
            error: 'Upload a file to continue'
        });
    }
    let img = req.files.imageProof;
    let imgDir = `${toTimeStamp(new Date())}_${img.name.split(' ').join('')}`;
    let imgName = path.join('deposit-proof', imgDir)
    const uploadDir = path.join( __dirname.split('routes')[0], 'public')
    console.log(imgName)
    img.mv(path.join(uploadDir, imgName));

    deposit.create({amount,  currency:'USD', coin, accountId, walletAddress, imageProof: imgDir}, (err, data)=>{
        if(err){
            res.status(400).end(err)
        }else{
            res.redirect('/dashboard');
        }
    })
})

router.post("/verify", (req, res)=>{
    let {id} = req.body;
    deposit.findById(id, (err, data)=>{
        if(err){
            return res.status(400).json(err);
        }else if(data.length < 1){
            return res.status(400).json({error: "Record not found"});
        }
        data = data[0];
        if(data.verified){
            return res.status(403).json({error: 'deposit already verifed'})
        }
        const {accountId} = data;
        account.deposit(accountId, data.amount, (err, result)=>{
            if(err) return res.status(400).json(err);
            deposit.verify(id, (err, result)=>{
                if(err){
                    return res.status(400).json(err);
                }
                return res.json(result);
            })
        })
        
    })
});

router.delete('/',(req, res)=>{
    const {id, reason, adminId} = req.body;
    if(!reason){
        return res.status(403).json({error: 'provide a reason for deletion'})
    }else if(!adminId){
        return res.status(403).json({error: 'your id is required'})
    }else if(!id){
        return res.status(403).json({error: `the value ${id} appears to be falsy, please provide a valid value`})
    }

    deposit.findById(id, (err, record)=>{

        if(err){
            return res.status(500).json({error: 'file could not be found', reason: err})
        }else if(!record || !record[0]){
            return res.status(404).json({error: "record not found", reason: 'record does not exist'})
        }else{
            if(record[0].verified){
                return res.status(403).json({error: 'failed to delete', reason: 'deposit has already been verified'})
            }
            deletedDeposit.create({...record[0], reason, deletedBy:adminId}, (err, data)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(data)
                }
            })
            deposit.delete(id, (err, data)=>{
                if(err){
                    res.status(500).json({error: 'record could not be deleted', reason : err})
                }else{
                    res.json({success: 'deleted the file successfully', message: data})
                }
            })
        }
    })
})
module.exports = router;