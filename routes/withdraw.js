const withdraw = require('../models/withdraw.js');
const deletedWithdraw = require('../models/deleted.withdraw.js')
const account = require("../models/account");
const express = require("express");
const e = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}))

router.use(express.json());

router.get('/', (req, res)=>{
    res.render('withdraw');
})

router.post("/", (req, res)=>{
    let {accountId, amount, coin, currency, walletAddress}= req.body;
    if(amount < 10){
        return res.status(400).json({error: "You can't withdraw less than $10"});
    }

    account.findById(accountId, (err, accounts)=>{
        if(err) return res.status(400).json({error: err});
        const acc = accounts[0];
        if(acc.ballance < amount){
            return res.status(400).json({error: "Account ballance is too low"});
        }
        account.deduct(acc.id, amount, (err, ans)=>{
            if(err){
                console.log(err);
            }else{
                console.log(ans)
            }
        });
        withdraw.create({amount, currency, coin, accountId, walletAddress}, (err, data)=>{
            if(err){
                return res.status(400).json({error: err});
            }else{
                return res.json({success: "Withdrawal initiated"});
            }
        })
    })
})


router.post("/verify", (req, res)=>{
    let {id} = req.body;
    if(!id){
        return res.status(403).json({error:'Provide an id for the recrd to be verified'})
    }
    withdraw.findById(id, (err,withdrawal)=>{
        if(err){
            return res.status(500).json({error: err})
        }
        if(!withdrawal){
            res.status(404).json({error:'Wthdraw record not found'})
        }
        if(withdrawal.verified){
            return res.status(403).json({error: 'withdraw has already been verified'});
        }
        withdraw.verify(id, (err, data)=>{
            if( err ) {
                return res.status(400).json({error: err})
            }else{
                res.json(data);
            }
        })
    })
    
})

router.post("/complete", (req,res)=>{
    let {id} = req.body;
    if(!id){
        return res.status(403).json({error:'Provide an id for the record'})
    }
    withdraw.findById(id, (err,withdrawal)=>{
        if(err){
            return res.status(500).json({error: err})
        }
        if(!withdrawal){
            res.status(404).json({error:'Wthdraw record not found'})
        }
        if(!withdrawal.verified){
            return res.status(403).json({error: 'withdraw has not been verified'});
        }
        if(withdrawal.completed){
            return res.status(403).json({error: 'withdraw has already been completed'})
        }
        withdraw.complete(id, (err, data)=>{
            if( err ) {
                return res.status(400).json({error: err})
            }else{
                res.json(data);
            }
        })
    })
})

router.delete('/',(req, res)=>{
    const {id, reason, adminId} = req.body;
    if(!reason){
        return res.status(403).json({error: 'provide a reason for deletion'})
    }else if(!adminId){
        return res.status(403).json({error: 'your id is required'})
    }else if(!id){
        return res.status(403).json({error: `the value ${id} appears to be falsy, please provide a valid value`})
    }

    withdraw.findById(id, (err, record)=>{
        console.log(record);
        if(err){
            return res.status(500).json({error: 'file could not be found', reason: err})
        }else if(!record || !record){
            return res.status(404).json({error: "record not found", reason: 'record does not exist'})
        }else if(record.completed){
            return res.status(403).json({error: 'withdraw cannot be deleted', reason: 'withdraw has already been completed'})
        }else{
            account.deposit(record.accountId, record.amount, (err, data)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(data)
                }
            })
            deletedWithdraw.create({...record, reason, deletedBy: adminId}, (err, data)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(data)
                }
            })
            withdraw.delete(id, (err, data)=>{
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