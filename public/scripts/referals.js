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

function utc2local(utcstr){
    const d = new Date(utcstr);
    let hour = d.getHours();
    let minute = d.getMinutes();
    let tmz = d.toTimeString().split('(')[1].split(')')[0];
    return `${(hour < 10 ? '0' : '')+hour}:${(minute < 10 ? '0' : '')+minute}, ${tmz}`
}

function loadReferals(){

    const usr = JSON.parse(localStorage.fullUserInfo);
    //console.log(usr.referals)
    const obj2el = obj =>{
        return `
        <div>
            <div>${oneAtATimeHash(obj.link)}</div>
            <div>${new Date(obj.date).toDateString()}}</div>
            <div>${utc2local(obj.date)}</div
        </div>`
    }
    let str ='';
    for(ref of usr.referals){
        str+=obj2el(ref);
    }
    document.getElementById('body').innerHTML = str;
}

loadReferals();

function oneAtATimeHash(keyString)
{
  let hash = 0;
  for (charIndex = 0; charIndex < keyString.length; ++charIndex)
  {
    hash += keyString.charCodeAt(charIndex);
    hash += hash << 10;
    hash ^= hash >> 6;
  }
  hash += hash << 3;
  hash ^= hash >> 11;
  //4,294,967,295 is FFFFFFFF, the maximum 32 bit unsigned integer value, used here as a mask.
  return (((hash + (hash << 15)) & 4294967295) >>> 0).toString(16)
};

