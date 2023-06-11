function message(information, background, color, icon){
    document.getElementById("message-icon").innerHTML = icon
    let msgBox = document.getElementById("message");
    let msgDisplay = document.getElementById("message-content");
    msgDisplay.innerHTML=information;
    msgDisplay.style.color=color;
    msgBox.style.color = color;
    msgBox.style.backgroundColor= background;
    msgBox.classList.remove("hidden");
    setTimeout(()=>{
        msgBox.classList.add("hidden");
    }, 7500);
}

function warn(msg){
    message(msg, '#dcc334', "black", '<i class="fa-solid fa-triangle-exclamation"></i>');
}

function inform(msg){
    message(msg, 'blue', 'white', '<i class="fa-solid fa-circle-info fa-beat-fade" style="--fa-beat-fade-opacity: 0.67; --fa-beat-fade-scale: 1.075;" ></i>');
}

function error(msg){
    message(msg, 'red', 'black', '<i class="fa-solid fa-triangle-exclamation fa-fade"></i>');
}

const currencies=["TRON (Trx)","TETHER/USDT (TRC20)", "Bitcoin (BTC)", "Ethereum (ETH)"];
const addresses=["0x16d1f1cb22057381e3abace8276f1924e67c5cf9","0x55d398326f99059ff775485246999027b3197955", "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5", "0xdB055877e6c13b6A6B25aBcAA29B393777dD0a73"];
let d='0x55d398326f99059ff775485246999027b3197955'
var choice =0;
function initiatePayment(paymentNo){
    choice = paymentNo;
    let payCurrency = currencies[choice];
    document.getElementById("pay-cur").innerHTML=payCurrency;
    document.getElementById("deposit-box").classList.remove("hidden")
}
function closeDepositBox(){
    document.getElementById("deposit-box").classList.add("hidden");
}
function showCoinAddress(){
    let value= document.getElementById("pay-amount").value;
    if(value < 20){
        error("value should be more than $20");
        return;
    }else if(value > 100000){
        error("value should be less than $100,000")
    }
    document.getElementById("pay-amnt-1").innerText = value;
    document.getElementById("pay-coin-1").innerText = currencies[choice];
    document.getElementById("coin-addr-val-1").value = addresses[choice];
    closeDepositBox()
    document.getElementById("coin-address").classList.remove("hidden")
}
function closeCoinAddress(){
    document.getElementById("coin-address").classList.add("hidden")
}
function copyWalletAddr() {
var copyText = document.getElementById("coin-addr-val-1");
copyText.select();
copyText.setSelectionRange(0, 99999); // For mobile devices

// Copy the text inside the text field
navigator.clipboard.writeText(copyText.value);

// Alert the copied text
inform("Copied the text: " + copyText.value +" to clipboard");
closeCoinAddress()
}

function expandConfirmButton(){
    document.getElementById('proof-form').classList.toggle('collapse');
    for(let element of document.getElementById('close-proof-form').children){
        element.classList.toggle('hidden');
    }
}

var user = JSON.parse(localStorage.user);

document.getElementById('account-id-input').value = user.id;
const formData = new FormData();
function confirmDeposit(){
   
    const fileField = document.querySelector('input[type="file"]');
    formData.append('imageProof', fileField.files[0]);
    [
        ['proof-amount', 'amount'],
        ['coin-type', 'coin'],
        ['wallet-address', 'walletAddress']
    ].forEach(e=>{
        formData.append(e[1], document.getElementById(e[0]).value);
    });
    formData.append('accountId', user.id);
    fetch('/deposit', {
        method: 'POST',
        body: formData
    }).then(d=>d.text())
    .then(d=>{
        console.log(d)
    }).catch(err=>{
        console.log(err)
    })
}
// document.forms[0].onsubmit=(e)=>{
//     e.preventDefault();
//     confirmDeposit();
// }

function loader(){
    const loaderElement = document.createElement('div');
    const container = document.createElement('div');
    const width = innerWidth;
    const height = innerHeight;
    const loaderDimensions = (width > height? height :width)/2;
    
    const loaderStyles ={
        width: loaderDimensions+'px',
        height: loaderDimensions+ 'px',
        background: 'url(/images/loading-icon-copy.svg)',
        backgroundSize: 'cover',
        position: 'absolute',
        top: `calc(50vh - ${loaderDimensions/2}px)`,
        right: `calc(50vw - ${loaderDimensions/2}px)`
    }
    const containerStyles = {
        width: '100vw',
        height: '100vh',
        backgroundColor: '##34418244',
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        top: '0px',
        right: '0px',
        zIndex: 100,
        display: 'none'
    }
    function loadStyles(element, styles){
        for(let style in styles){
            element.style[style] = styles[style];
        }
    }
    loadStyles(loaderElement, loaderStyles);
    loadStyles(container, containerStyles);
    container.append(loaderElement)
    return container;
}
const loaderElement = loader();
document.body.append(loaderElement)
function startLoad(){
    loaderElement.style.display= ''
}
function endLoad(){
    loaderElement.style.display = 'none'
}