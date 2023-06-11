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