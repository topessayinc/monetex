const account = require("../models/account");
const referal = require("../models/referal");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const idGen = require("../utils/num2text");
router.use(express.urlencoded({extended: true}));
router.use(express.json());
router.get("/", (req, res)=>{
    res.render("signup");
})


router.post("/", (req, res)=>{
    let {name, email, phone, password, inviteLink, country, dateOfBirth}=req.body;
    account.findByEmail(email, (err, data)=>{
        if(data && data.length> 0){
            return res.status(400).json({
                error: "An accout by email "+email+' is already registered'
            })
        }else{
            account.findByPhone(phone, (err, data)=>{
                if(data && data.length > 0){
                    return res.status(400).json({
                        error: "An account has been registered under phone number "+phone
                    })
                }
                let pwdSalt=bcrypt.genSaltSync(10);
                password=bcrypt.hashSync(req.body.password, pwdSalt);
                account.create({name, email, phone, password, country, inviteLink, dateOfBirth}, (err, data)=>{
                    if(err){
                        res.status(500).json(err);
                    }else{
                        account.findByEmail(email, (err, data)=>{
                            if(err) return res.status(500).end("error");
                            res.json(data);
                            console.log(data)
                        })
                    }
                })
                if(inviteLink){
                    referal.create(inviteLink, (err, data)=>{
                        if(err){
                            console.log(err)
                        }
                    })
                }
            })
        }
        
    })
    
});

module.exports = router;