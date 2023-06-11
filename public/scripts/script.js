const [xButton, barButton] = document.getElementsByClassName("mb-icon");
const navOptions = document.getElementById("nav-option");

function hideNavOptions(){
    [navOptions, xButton, barButton].forEach(d=>{d.classList.toggle("hidden")});
}

[xButton, barButton].forEach(e=>{e.onclick=hideNavOptions});
hideNavOptions();

document.getElementsByTagName("nav")[0]