function burgerOnClick(){
    console.log('burger!')
    let nav = document.querySelector('.tablet-nav-container');
    nav.style.display = 'block';
    setTimeout(() =>{        
        nav.style.opacity = '100%'
        nav.style.transform = 'translate(0, 0)'
    }, 10);
}

function closeTabletMeny(){
    let nav = document.querySelector('.tablet-nav-container');
    nav.style.opacity = '0'
    nav.style.transform = 'translate(0, -20px)'
    setTimeout(() =>{        
        nav.style.display = 'none';
    }, 10);
}
