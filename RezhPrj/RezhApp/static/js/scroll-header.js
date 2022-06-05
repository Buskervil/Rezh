let header = document.querySelector('header');
function headerScroll(){
    let previous = +window.pageYOffset;
    console.log('зашли в функцию');
    setInterval(() => {
        if (window.pageYOffset > header.style.height && previous < window.pageYOffset){
            header.classList.add('hidden');
        }
        else if (window.pageYOffset > header.style.height && previous > window.pageYOffset){
            header.classList.add('background-transparent');
            header.classList.remove('hidden');
        }
        previous = window.pageYOffset;
        if (window.pageYOffset == 0){
            header.classList.remove('background-transparent');
        }
    }, 100);
}
headerScroll();