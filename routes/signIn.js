const express = require("express");
const {compareSync} = require("bcrypt")
const account = require("../models/account");

const router = express.Router();


router.use(express.urlencoded({extended: true}));
router.use(express.json());

router.get('/', (req, res)=>{
    res.render('login')
})
router.post("/", (req, res)=>{
    let {email, password}= req.body;

    account.findByEmail(email, (err, data)=>{
        if(err) return res.json(err);
        if(data.length < 1) return res.json(data);
        let account = data[0];

        if(compareSync(password, account.password)){
            res.json(account);
        }else{
            res.status(400).json({error: "wrong password"});
        }
    })
})

module.exports = router;