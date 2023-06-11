const user = JSON.parse(localStorage.user);
loadFullUserInfo();


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

// create message box
function createMessageBar(){
    const container = document.createElement('div');
    const iconContainer = document.createElement('div');
    const content = document.createElement('div');
    const closeMsgBox = document.createElement('div');
    const closeMsgBoxIcon  = document.createElement('i');

    closeMsgBoxIcon.style.color = 'white';
    closeMsgBoxIcon.style.fontSize = '1rem';

    closeMsgBoxIcon.classList.add('fa-solid', 'fa-xmark');
    closeMsgBox.append(closeMsgBoxIcon);

    container.append(iconContainer, content, closeMsgBox);
    container.classList.add('hidden');

    const styles =[
        {
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '100vw',
            height: 'fit-content',
            padding: '10px',
            display: 'grid',
            gridTemplateColumns: '1fr 8fr 1fr',
            transition: 'ease 400ms',
            zIndex: 200
        },
        {
            textAlign: 'center',
            maxWidth: '80vw',
            overflowY: 'hidden'
        }
    ]
    function loadStyles(element, styles){
        for(let style in styles){
            element.style[style] = styles[style];
        }
    }

    loadStyles(container, styles[0]);
    loadStyles(content, styles[1]);
    return {
        container,
        iconContainer, 
        content, 
        closeMsgBox
    };
}

let messageBoxElements = createMessageBar();
document.body.append(messageBoxElements.container);
function message(information, background, color, icon){
    let {
        container,
        iconContainer, 
        content
    } = messageBoxElements;

    iconContainer.innerHTML = icon;
    content.innerHTML=information;
    content.style.color=color;
    container.style.color = color;
    container.style.backgroundColor= background;
    container.classList.remove("hidden");
    setTimeout(()=>{
        container.classList.add("hidden");
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
// end of message box


// loading animation
function createLoader(){
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
const loaderElement = createLoader();
document.body.append(loaderElement)
function startLoad(){
    loaderElement.style.display= ''
}
function endLoad(){
    loaderElement.style.display = 'none'
}

// end of animation


function selectActiveTab(){
    const tabIds = ['deposit-t', 'withdraw-t', 'investment-t'];
    const contentIds = ['deposit', 'withdraw', 'investments']
    const activeTabDisplay = document.getElementById('active-tab')
    const tabs = tabIds.map(d=> document.getElementById(d));
    const arr = [0,1,2].map(i=>{
        return [document.getElementById(tabIds[i]), document.getElementById(contentIds[i])]
    })
    arr.forEach(([d, e])=>{
        d.onclick = ()=>{
            arr.forEach(([f,g])=>{
                f.style.display = '';
                g.style.display = 'none';
            })
            d.style.display = 'none';
            e.style.display = ''

            activeTabDisplay.innerText = d.innerText;
        }
    })
    arr[0][0].click()
}

selectActiveTab();


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

const testData = JSON.parse(localStorage.fullUserInfo)

function printInvestments(investments){
    const table = document.getElementById('investments-table');
    function createInvRecord(){
        let c = document.createElement('tr');
        for(let i = 0; i< 3; i++){
            let e =document.createElement('td');
            e.recordIndex = i;
            c.append(e);
        }
        return c;
    }
    investments.forEach(d=>{
        let c = createInvRecord();
        c.onclick = ()=>fillInvestmentPopup(d);

        let e =c.children;
        e[0].innerText = `$${d.amount}`;
        e[1].innerText = d.plan;
        e[2].innerText = d.alive? 'active' : 'Completed';
        table.append(c);
    })
}

const uinfo = JSON.parse(localStorage.fullUserInfo);

printInvestments(uinfo.investments)
const closeInvestmentPopup= ()=>{
    document.getElementById('investment-popup').classList.add('hidden')
}
document.getElementById('close-i-pp').onclick=closeInvestmentPopup;
function utc2local(utcstr){
    const d = new Date(utcstr);
    let hour = d.getHours();
    let minute = d.getMinutes();
    let tmz = d.toTimeString().split('(')[1].split(')')[0];
    return `${(hour < 10 ? '0' : '')+hour}:${(minute < 10 ? '0' : '')+minute}, ${tmz}`
}
function fillInvestmentPopup(investment){
    const {plan, amount, givenTimes, createdAt} = investment;
    document.getElementById('investment-popup').classList.remove('hidden')
    document.getElementById('i-p-content').innerHTML = `<h1><span id="plan-name">${plan}</span> Plan</h1><div class="kv">
        <div class="key">Amount</div>
        <div class="val">$${amount}</div>
    </div>
    <div class="kv">
        <div class="key">Given times</div>
        <div class="val">${givenTimes}</div>
    </div>
    <div class="kv">
        <div class="key">Remaining times</div>
        <div class="val">${30 - givenTimes}</div>
    </div>
    <div class="kv">
        <div class="key">Date Created</div>
        <div class="val">${createdAt? new Date(createdAt).toDateString() : "Date not recorded"}</div>
    </div>
    <div class="kv">
        <div class="key">Time Created</div>
        <div class="val">${createdAt? utc2local(createdAt) : "Date not recorded"}</div>
    </div>
    <button class="">${(30 - givenTimes) > 0 ? "Active": "completed"}</button>`
}


function printDepositInfo(){
    const deposits = uinfo.deposits;
    for(let e of deposits){
        let tr = document.createElement("div");
        tr.classList.add('d-t-b');
        let {amount, coin, walletAddress, verified} = e;
        tr.innerHTML = `
        <div>$${amount}</div>
        <div>${coin}</div>
        <div>USD</div>
        <div>${walletAddress}</div>
        <div>${verified? 'completed':'pending'}</div>`;
        document.getElementById("deposit-table").append(tr);
        
    }
}

printDepositInfo();


function printWithdrawInfo(){
    const withdraw = uinfo.withdrawals;
    for(let e of withdraw){
        let tr = document.createElement("div");
        tr.classList.add('d-t-b');
        let {amount, coin, walletAddress, verified} = e;
        tr.innerHTML = `
        <div>$${amount}</div>
        <div>${coin}</div>
        <div>USD</div>
        <div>${walletAddress}</div>
        <div>${verified? 'completed':'pending'}</div>`;
        document.getElementById("withdraw-table").append(tr);
    }
}

printWithdrawInfo();