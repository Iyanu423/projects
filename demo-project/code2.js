// This handles the opening and closing of the sidebar menu on mobile devices
const navBar= document.querySelector('nav');

document.querySelector('#menu-icon').addEventListener('click',(e)=>{ navBar.style.width= '50%';})
document.querySelector('#exit-icon').addEventListener('click',(e)=>{ navBar.style.width= '0';})


/* The allWrappers variable contains all the steps elements in the form and
they are all accessed by their index through out this code */
const allWrappers= document.querySelectorAll('.wrapper-item');
const allSubmitButtons= document.querySelectorAll('.submit-btn');
const listNumbers= document.querySelectorAll('.list-number');

const planSummary= document.querySelector('#plan-summary').children[0];
const planSummaryPrice = document.querySelector('#plan-summary').children[1];

const firstAddOnWrapper =  document.querySelector('#first-add-on-summary');
const firstAddOnSummary= document.querySelector('#first-add-on-summary').querySelector('span:nth-child(2)');
const firstAddOnName =  document.querySelector('#first-add-on-summary').querySelector('span');

const secondAddOnWrapper =  document.querySelector('#second-add-on-summary');
const secondAddOnSummary= document.querySelector('#second-add-on-summary').querySelector('span:nth-child(2)');
const secondAddOnName =  document.querySelector('#second-add-on-summary').querySelector('span');

const thirdAddOnWrapper =  document.querySelector('#third-add-on-summary');
const thirdAddOnSummary= document.querySelector('#third-add-on-summary').querySelector('span:nth-child(2)');
const thirdAddOnName =  document.querySelector('#third-add-on-summary').querySelector('span');

const totalSum = document.querySelector('.total-sum');
const thankYouMsg= document.querySelector('dialog');
const closeDialog= document.querySelector('#close-dialog');
closeDialog.addEventListener('click',() =>{
    thankYouMsg.close();
    location.reload();
});

const stepNumbers= document.querySelectorAll('.list-number');

const mainWrapper= document.querySelector('#wrapper');
mainWrapper.removeChild(allWrappers[2]);
mainWrapper.removeChild(allWrappers[3]);
mainWrapper.removeChild(allWrappers[4]);

const nameInput= document.querySelector('#user-name');

const emailInput= document.querySelector('#user-email');
const validEmailRegex= /^[a-zA-Z0-9_%.+]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

const telInput= document.querySelector('#user-tel');

function addAndRemoveEle(removeIndex,appendIndex,removeIndex2,removeIndex3){
    mainWrapper.removeChild(allWrappers[removeIndex]);
    mainWrapper.appendChild(allWrappers[appendIndex]);
    mainWrapper.removeChild(allWrappers[removeIndex2]);
    mainWrapper.removeChild(allWrappers[removeIndex3]);
}

// This code handles the step 1 form validation
listNumbers[0].setAttribute('style',' outline-offset: 5px;background: skyblue;');
allSubmitButtons[0].addEventListener('click',()=>{
        let nameValid= false;
        let emailValid= false;
        let telValid= false;
     nameInput.value===''? nameInput.style.border= '2px solid red': (nameInput.style.border= ' 1px solid gray',nameValid= true);
     emailInput.value==='' || !(emailInput.value.match(validEmailRegex))? emailInput.style.border= '2px solid red' : (emailInput.style.border= '1px solid gray', emailValid= true)
     telInput.value==='' || !(telInput.value.match(/[1-9]/)) || telInput.value.length <8 ? telInput.style.border= '2px solid red' : (telInput.style.border= '1px solid gray',telValid=true);

     if(nameValid && emailValid && telValid){
        listNumbers[0].setAttribute('style',' outline-offset: 0;background: none;');
        listNumbers[1].setAttribute('style',' outline-offset: 5px;background: skyblue;');
        addAndRemoveEle(1,2);
    }
})

// This code handles the step 2 form validation
let selectedGamingPlan;
let selectedGamingPlanPrice;
let selectedBillingPlan;
allSubmitButtons[1].addEventListener('click',(e)=>{
    const parentWrapper= e.target.closest('section');
    const planOptions= document.querySelectorAll('#billing-plans input');
    const billingCycleOption= document.querySelector('#billing-cycle input');
    planOptions.forEach((plan)=>{
        if(plan.checked){
            let price= plan.nextElementSibling.children[1].children[1].querySelector('span:nth-child(2)').textContent;
            selectedGamingPlan= plan.value;
            selectedGamingPlanPrice= parseInt(price);
            billingCycleOption.checked? billingCycleOption.value= '(Yearly)' : billingCycleOption.value= '(Monthly)';
            selectedBillingPlan= billingCycleOption.value;
            listNumbers[1].setAttribute('style',' outline-offset: 0;background: none;');
            listNumbers[2].setAttribute('style',' outline-offset: 5px;background: skyblue;');
            addAndRemoveEle(2,3);
        }
    })
})



// This code handles the step 3 form validation
let firstAddOn;
let secondAddOn;
let thirdAddOn;

let firstAddOnPrice;
let secondAddOnPrice;
let thirdAddOnPrice;
const addOnOptions= document.getElementsByClassName('add-on-option');
allSubmitButtons[2].addEventListener('click',()=>{

     addOnOptions[0].checked ? (firstAddOn= addOnOptions[0].nextElementSibling.children[0].textContent,
     firstAddOnPrice=parseInt(addOnOptions[0].nextElementSibling.nextElementSibling.children[1].textContent))  : (firstAddOnPrice=0,firstAddOn= '');

     addOnOptions[1].checked ? (secondAddOn= addOnOptions[1].nextElementSibling.children[0].textContent,
     secondAddOnPrice=parseInt(addOnOptions[1].nextElementSibling.nextElementSibling.children[1].textContent)): (secondAddOnPrice= 0,secondAddOn= '');

     addOnOptions[2].checked ? (thirdAddOn= addOnOptions[2].nextElementSibling.children[0].textContent,
     thirdAddOnPrice= parseInt(addOnOptions[2].nextElementSibling.nextElementSibling.children[1].textContent)) : (thirdAddOnPrice=0,thirdAddOn= '');
     planSummary.textContent= `${selectedGamingPlan} ${selectedBillingPlan}`;
     planSummaryPrice.textContent= `$${selectedGamingPlanPrice}/mon`;
    
     firstAddOn ? (
        firstAddOnSummary.textContent= `$${firstAddOnPrice}/mon`,
        firstAddOnName.textContent= `${firstAddOn}`,
        firstAddOnWrapper.style.padding= '1rem') : firstAddOn= '';
     secondAddOn?(
            secondAddOnSummary.textContent= `$${secondAddOnPrice}/mon`,
            secondAddOnName.textContent= `${secondAddOn}`,
            secondAddOnWrapper.style.padding= '1rem') : secondAddOn= '';
     thirdAddOn? (
            thirdAddOnSummary.textContent= `$${thirdAddOnPrice}/mon`,
            thirdAddOnName.textContent= `${thirdAddOn}`,
            thirdAddOnWrapper.style.padding= '1rem') : thirdAddOn= '';
            const tSum= selectedGamingPlanPrice+firstAddOnPrice+secondAddOnPrice+thirdAddOnPrice;
            totalSum.textContent= `$${tSum}/mon`;
            listNumbers[2].setAttribute('style',' outline-offset: 0;background: none;');
            listNumbers[3].setAttribute('style',' outline-offset: 5px;background: skyblue;');
     addAndRemoveEle(3,4);
});


// This code handles the step 4 form validation
allSubmitButtons[3].addEventListener('click',()=>{
            thankYouMsg.showModal();
})