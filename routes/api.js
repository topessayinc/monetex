const {
    account, deposit, investment, referal, withdraw, deletedDeposit, deletedWithdraw
} = require('../models/export.js');

const express = require('express')
const router =  express.Router();

router.get('/deposit/deleted', (req, res)=>{
    deletedDeposit.find((err, data)=>{
        if(err){
           return  res.status(500).json(err)
        }
        res.json(data)
    })
})
router.get('/withdraw/deleted', (req, res)=>{
    deletedWithdraw.find((err, data)=>{
        if(err){
           return  res.status(500).json(err)
        }
        res.json(data)
    })
})
router.get('/account', (req, res)=>{
    account.find((err, data)=>{
        if(err){
            res.status(200).json({error: err})
        }
        else{
            res.json(data)
        }
    })
})

router.get('/deposit', (req, res)=>{
    deposit.find((err, data)=>{
        if(err){
            res.status(200).json({error: err})
        }
        else{
            res.json(data)
        }
    })
})

router.get('/investment', (req, res)=>{
    investment.find((err, data)=>{
        if(err){
            res.status(200).json({error: err})
        }
        else{
            res.json(data)
        }
    })
})

router.get('/referal', (req, res)=>{
    
    referal.find((err, data)=>{
        if(err){
            res.status(200).json({error: err})
        }
        else{
            res.json(data)
        }
    })
})

router.get('/withdraw', (req, res)=>{
    withdraw.find((err, data)=>{
        if(err){
            res.status(200).json({error: err})
        }
        else{
            res.json(data)
        }
    })
})

module.exports = router;