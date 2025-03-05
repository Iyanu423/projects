// This handles the opening and closing of the sidebar menu on mobile devices
const navBar= document.querySelector('nav');

document.querySelector('#menu-icon').addEventListener('click',(e)=>{
    navBar.style.width= '50%';
})

document.querySelector('#exit-icon').addEventListener('click',(e)=>{
    navBar.style.width= '0';
})



// This code handles the form validation
const userEmail= document.querySelector('#user-email');
window.onload = ()=>userEmail.focus();

const userPassword= document.querySelector('#user-password');
const validEmailRegex= /^[a-zA-Z0-9_%.+]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
const passwordReveal= document.querySelector('#password-icon');


// This handles the password visibilty in the user form
let passwordVisible= false;
passwordReveal.addEventListener('click',(e)=>{
    if(!passwordVisible){
        e.target.src= 'chat-app/images/reveal-password-icon.png';
        userPassword.type= 'text';
        passwordVisible= true;
    }else{
        e.target.src= 'chat-app/images/hide-password-icon.png';
        userPassword.type= 'password';
        passwordVisible= false;
    }
})



const formInputs= document.querySelectorAll('form input');

const userForm= document.querySelector('form').addEventListener('submit',(e)=>{

   for(let i=0; i<formInputs.length;i++){
    if(formInputs[i].value===''){
         formInputs[i].nextElementSibling.nextElementSibling.style.display= 'block';
         e.preventDefault();
      }
      else if(formInputs[i].value !==''){
        formInputs[i].nextElementSibling.nextElementSibling.style.display= 'none';
     }
   }

     if(!(userEmail.value.match(validEmailRegex))){
    userEmail.nextElementSibling.nextElementSibling.style.display= 'block';
    e.preventDefault()
   }
   else{
    userEmail.nextElementSibling.nextElementSibling.style.display= 'none';
   }
})

