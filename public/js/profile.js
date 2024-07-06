let remReadBtn = document.querySelector("#removeReadOnlyBtn");
let readInputs = document.querySelectorAll(".removeReadOnly");
let saveBtn=document.querySelector('.saveBtn');
let profPicInput=document.querySelector('#profImage');
let profPicForm=document.querySelector('#profile-form');

profPicInput.addEventListener('change',()=>{
    profPicForm.submit();
})

remReadBtn.addEventListener("click", () => {
    saveBtn.classList.remove('saveBtn')
   for(let inp of readInputs){
    inp.removeAttribute('readonly')
    inp.classList.add('border-inp')
   }
});
