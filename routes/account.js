const account = require("../models/account")
const investment = require("../models/investment")
const deposit = require("../models/deposit")
const withdrawal = require("../models/withdraw")
const referal = require("../models/referal")

const express = require("express")
const router  = express.Router()

router.use(express.json())

router.post("/", (req, res)=>{
    const {id, accessKey} = req.body;
    account.findById(id, (err, data)=>{
        if(err) return res.status(400).json({error: err});
        const user = data[0];
        if(!user){
           return res.status(404).json({error: "Account not found"})
        }
        if(accessKey != user.accessKey){
            return res.status(403).json({error:'Access Forbidden!'})
        }
        delete user.accessKey;
        deposit.findByUserId(id, (err, deposits)=>{
            if(err) user.deposits = err;
            else user.deposits = deposits;
            investment.findByAccount(id, (err, investments)=>{
                if(err) user.investments = err;
                else user.investments = investments;
                withdrawal.findByUserId(id, (err, withdrawals)=>{
                    if(err) user.withdrawals = err;
                    else user.withdrawals = withdrawals;
                    referal.findByUserId(id, (err, referals)=>{
                        if(err) user.referals= err;
                        else user.referals = referals;
                        res.json(user);
                    })
                })
            })
        })
    })
})

router.post('/id', (req, res)=>{
    const {id, accessKey} = req.body;
    account.findById(id, (err, user)=>{
        if(err){
            return res.status(500).json({error: 'Failed to find account details'});
        }else{
            user = user[0];
            if(!user){
                res.status(500).json({error: 'User not found'})
            }else if(user.accessKey != accessKey){
                res.status(403).json({error: 'Access denied'});
            }else{
                res.json(user);
            }
        }
    })
})
module.exports = router