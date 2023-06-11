const investment =  require("../models/investment");
const {choosePlan} = require("../utils/plans.js");
const express = require("express");
const account = require("../models/account");
const router = express.Router();
router.use(express.urlencoded({extended: true}));
router.use(express.json());
const invest = require("../utils/investmenst");


router.post('/', (req, res)=>{

    const {amount, accountId} = req.body;
    if(amount < 5){
        return res.status(400).json({error: "Amount not enough to Invest"})
    }
    const plan = choosePlan(amount);
    if(!plan){
        return res.status(403).json({error: "Amounnt is out of range"})
    }
    account.findById(accountId, (err, data)=>{
        console.log(data);
        if(err){
            return res.status(400).json({error:err})
        }if(data.length< 1){
            return res.status(400).json({error: "Account not found"});
        }

        acc = data[0];

        if(acc.ballance < 100){
            return res.status(400).json({error: "ballance too low"});
        }

        if(acc.ballance < amount){
            return res.status(400).json({error: "your ballance is not enough to make $"+amount+" invesment"});
        }

        account.deduct(accountId, amount, (err, result)=>{
            if(err){
                return res.status(400).json({error: err})
            }else{
                investment.create({amount, plan:plan.title, accountId, stepLimit: plan.stepLimit}, (err, result)=>{
                    if(err){
                        res.status(400).json({error: err});
                    }else{
                        res.json({success: "Investment has begun"});
                    }
                })
            }
        })
    })
})

router.get("/", (req, res)=>{
    try{
        invest();
        res.json({success: "ivested"});
    }catch(err){
        res.status(400).json(err);
    }
    
})
module.exports = router;