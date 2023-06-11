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