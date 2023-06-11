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
        backgroundColor: '##34418280',
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