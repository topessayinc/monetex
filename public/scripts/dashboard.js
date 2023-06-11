// Investmet Plans

class InvestmentPlan{
    constructor (title, minimumAmount, maximumAmount, duration, rate, interval){
        this.title = title;
        this.min = minimumAmount;
        this.max = maximumAmount;
        this.duration = duration;
        this.rate = rate;
        this.interval = interval;
    }

 }

//  Plan titles
// golden, silver, platinum, copper;
new InvestmentPlan('Golden Plan', 1000, 10000, 30, 0.05, )
const plans =[
    new InvestmentPlan('Golden Plan', 1000, 10000, 30, 0.05, 1),
    new InvestmentPlan('Silver Plan', 100, 1000, 30, 0.05, 1),
    new InvestmentPlan('Platinum Plan', 10, 100, 30, 0.05, 1),
    new InvestmentPlan('Copper Plan', 5, 10, 30, 0.05, 1),
];


document.getElementById("mb-cancel-btn").onclick = e=>{
    collapseBtnOptions()
}
function collapseBtnOptions(){
    document.getElementById("nav-options").classList.toggle("mb-hidden");
    document.getElementById("profile").classList.toggle("mb-hidden");
    for(let child of document.getElementById("mb-cancel-btn").children){
        child.classList.toggle("mb-hidden");
    }
}

collapseBtnOptions();


function copyReferalLink() {
var copyText = document.getElementById("my-referal-link");
copyText.select();
copyText.setSelectionRange(0, 99999); // For mobile devices

// Copy the text inside the text field
navigator.clipboard.writeText(copyText.value);

// Alert the copied text
inform("You have copied: <a href=\""+copyText.value+"\">" + copyText.value +"</a> to clipboard");
}

var user = JSON.parse(localStorage.user);
const referalLink = location.origin + "/signup?invite_link="+user.id;

function loadBasicUserInfo(){
    document.getElementById("my-referal-link").value = referalLink;
    document.getElementById("user-name-val").innerText = user.name.split(" ")[0];
    document.getElementById("matured-ballance").innerText = user.ballance
}
function updateBasicUnserInfo(){
    fetch('/account/id', {
        body: JSON.stringify({
            id: user.id,
            accessKey: user.accessKey
        }),
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(d=> d.json()).then(usr=>{
        localStorage.setItem('user', JSON.stringify(usr));
        user = usr;
    }).catch(err=>{
        console.log(err);
    })
}
async function loadFullUserInfo(){
    const response = fetch("/account", {
        method: 'POST',
        body: JSON.stringify({
            id: user.id,
            accessKey: user.accessKey
        }),
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    });
    try {
        const data = await (await response).text();
        localStorage.setItem("fullUserInfo", data);
        return data;
    } catch (error) {
        const data = (await response).text()
        console.log(error)
         return data;
    }
    

}

function printUserInfo(){
    const data = JSON.parse(localStorage.fullUserInfo);
    function getTotalAmount(arr){
        let tot =0;
        for(let i of arr){
            tot+=i.amount;
        }
        return tot;
    }
    let deposit_t = getTotalAmount(data.deposits)
    let investment_t =  getTotalAmount(data.investments)
    let withdrawals_t =  getTotalAmount(data.withdrawals)
    console.log({
        deposit: deposit_t
    })
    document.getElementById("total-deposit").innerText = deposit_t;
    document.getElementById("total-withdrawn").innerText = withdrawals_t;
    document.getElementById("total-invested").innerText = investment_t;
    
}
function loadUserInfo(){
    updateBasicUnserInfo();
    loadBasicUserInfo();
    loadFullUserInfo().then(()=>{
        printUserInfo();
    })
}

loadUserInfo();


function increaseInvestAmount(){
   const el = document.getElementById("invest-amount-i");
   let el_value = 1+parseFloat(el.value);
   if(el_value <= el.getAttribute('max')){
        el.value = el_value;
   }
}

function reduceInvestAmount(){
    const el = document.getElementById("invest-amount-i");
    let el_value = parseFloat(el.value)-1;
    if(el_value >= el.getAttribute('min')){
         el.value = el_value;
    }
 }

 function closeInvestWindow(){
    document.getElementById("invest").classList.add("hidden")
 }

 function openInvestWindow(index){
    const options = plans.map(d=> d.title);
    const amountInput = document.getElementById("invest-amount-i");
    amountInput.setAttribute("max", plans[index].max);
    amountInput.setAttribute('min', plans[index].min);
    amountInput.value = plans[index].min;
    document.getElementById('i-plan').innerText = options [index];
    document.getElementById('invest').classList.remove('hidden');
 }

 window.onscroll=e=>{
    const distanceFromTop = Math.abs(
        document.body.getBoundingClientRect().top
    );
    document.getElementById("invest").style.top= distanceFromTop+'px';
    document.getElementsByTagName('nav')[0].style.top = distanceFromTop+'px';
    document.getElementById('message').style.top = distanceFromTop+'px';
 }
 

async function initiateInvestment(amount){
    let data = {
        accountId: user.id,
        amount
    };
    const response = await fetch("/invest", {
        method: 'POST',
        body: JSON.stringify(data),
        headers : {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    }); 
    if(response.ok){
        inform("Investment initiated Successfully")
    }else{
        try{
            let errorMsg = await response.json();
            error(errorMsg.error)
        }catch(err){
            console.log(err);
        }
    }
 }

function invest(){
    let amount = document.getElementById('invest-amount-i').value;
    initiateInvestment(amount);
    closeInvestWindow();
}