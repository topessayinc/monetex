const account = require("../models/account");
const investment = require("../models/investment");
const {choosePlan} = require("./plans.js");


function invest(investmentId){
    investment.findById(investmentId, (err, result)=>{
        if(err){
            console.log(err);
            return 0;
        }
        
        if(result.length < 1){
            return 0;
        }

        let inv = result[0];
        if(!inv.alive){
            return 0;
        }
        
        if(inv.stepsTaken < inv.stepLimit){
            investment.updateSpecificInfo({id: inv.id, info: "stepsTaken", value: inv.stepsTaken +1}, (err, d)=>{
                if(err) console.log(err);
             })

             return 0;
        }
        investment.updateSpecificInfo({id: inv.id, info: "stepsTaken", value:1}, (err, d)=>{
            if(err) console.log(err);
         })
        let plan = choosePlan(inv.amount);

         console.log({plan, inv})
        if(inv.givenTimes >= plan.interval){
            investment.updateSpecificInfo({id: investmentId, info: "alive", value: false}, (err, data)=>{
                if(err){
                    console.log(err);
                }
            })
            return 0;
        }
        investment.updateSpecificInfo({id:investmentId, info: "givenTimes", value: inv.givenTimes + 1}, (err, data)=>{
            if(err) console.log(err);
            
        })

        account.deposit(inv.accountId, plan.intervalReturn, (err, data)=>{
            if(err) console.log(err);
            
        });
        
    })
}

module.exports = ()=>{
    investment.find((err, investments)=>{
        if(err){
            console.trace(err);
            return 0;
        }
        for(let i of investments){
            if(i.alive){
                invest(i.id);
            }
        }
    })
}