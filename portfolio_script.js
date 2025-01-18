let menu =document.querySelector('#menu-icon');
let navbar= document.querySelector('.navbar');
const menuItems = document.querySelectorAll('.menu-item');



menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    
    
    navbar.style.textAlign='center';
    
    
}




window.onscroll =()=>{
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text', {
    strings: ['FullStack Developer','Frontend Developer', 'Backend Developer', 'Java Developer',],
    typeSpeed: 80,
    backSpeed:80,
    backDelay:1200,
    loop:true,
  });
  function viewCV() {
    // Opens the CV page in a new tab/window
    window.open("asssets/Gajam-Manikumar-FlowCV-Resume-20250107.pdf");
}