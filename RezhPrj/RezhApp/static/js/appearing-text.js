function textAppear(){
    setInterval(() => {
        let carts = document.querySelectorAll('.block__link')
        for (let cart of carts){
            cart.addEventListener('mouseover', function hover() {
                console.log(cart.childNodes);
                cart.childNodes.item(3).style.opacity = "100%";
                cart.childNodes.item(3).style.transform = "translate(0) rotate(0)";
            });
            cart.addEventListener('mouseleave', function leave() {
                cart.childNodes.item(3).style.opacity = "0";
                cart.childNodes.item(3).style.transform = "translate(0px, 10px) rotate(2deg)";
            });
        }
    }, 1000);    
}
textAppear();