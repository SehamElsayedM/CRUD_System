let inputs = document.querySelectorAll(".input");console.log(inputs);
let createBtn = document.querySelector(".createBtn");
let body = document.querySelector(".cards");
let clearBtn = document.querySelector(".clearBtn button");

let Color = document.querySelector(".colorPart input");


let Data ;
if (localStorage.products == null) {
    Data = [];
} else {
    Data = JSON.parse(localStorage.products);
}

let file;
let global ;



//==========================================================
let getTotal = () => {
    let price = Number(inputs[1].value);
    let tax = Number(inputs[2].value);
    let discount = Number(inputs[3].value);

    let taxCost = price * tax / 100;
    let priceAfterTax = taxCost + price;
    let total = priceAfterTax - discount;
    inputs[5].value = Math.ceil(total);
}
for (let index = 0; index < inputs.length; index++) {
    inputs[index].addEventListener("keyup", getTotal);
}
//==============================================================
function handleFileSelect(event) {
    file = event.target.files[0];
    console.log(file.name);
}
inputs[7].addEventListener("change", handleFileSelect);

//=============================================================
let createProduct = () => {
    let date = new Date();

    let newObject = {
        title: inputs[0].value,
        price: inputs[1].value,
        tax: inputs[2].value,
        discount: inputs[3].value,
        amount: inputs[4].value,
        total: inputs[5].value,
        type: inputs[6].value,
        src: file.name,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        color: Color.value,

    }

if (createBtn.innerHTML == "Save Data") {
    
   Data.push(newObject);
    

}else{
    Data[global] = newObject ;
    createBtn.innerHTML = "Save Data";
}

    
    show();
    console.log(Data);
    localStorage.setItem("products", JSON.stringify(Data));
    show();
    emptyInputs();
}
createBtn.addEventListener("click", createProduct);
//=======================================================
let check = () => {
    
        if(Data.length > 0){
            clearBtn.classList.remove("none");
        }else{
            clearBtn.classList.add("none");  
        }
    }
//==========================================================
let show = () => {
    check();
    body.innerHTML = '';
    let inner = '';
    for (let i = 0; i < Data.length; i++) {
        inner += `
         <div class="oneCard">
                        <div class="image">
                            <img src="./img/${Data[i].src}" alt="">
                        </div>
                        <div class="data">
                            <span>Name :${Data[i].title} </span>
                            <span>Price :${Data[i].total} $ </span>
                            <span>available color :<div class="color" style="background :${Data[i].color}"></div> </span>
                            <span>Amount :${Data[i].amount} Items</span>
                            <span>type :${Data[i].type} </span>
                            <span>date :${Data[i].day}/ ${Data[i].month} / ${Data[i].year} </span>
                            
                        </div>
                        <div class="action">
                            <i onclick="removeOneItem(${i})" class="fa-solid fa-trash-can"></i>           
                            <i onclick="editOneItem(${i})" class="fa-solid fa-pen-to-square"></i>
                        </div>
                    </div>
         `
        body.innerHTML = inner;
    }

}
show();
//=================================================================
let emptyInputs = () => {
    inputs[0].value = '';
    inputs[1].value = '';
    inputs[2].value = '';
    inputs[3].value = '';
    inputs[4].value = '';
    inputs[5].value = '';
    inputs[6].value = '';
    inputs[7].value = '';
}
//==========================================================
let clearAll = () => {
localStorage.clear();
    Data.splice(0);
    check();
    show();
}
clearBtn.addEventListener("click", clearAll);
//==========================================================
let removeOneItem = (i) => {

    Data.splice(i, 1);
    localStorage.products = JSON.stringify(Data);
    show();
}
//==========================================================
let editOneItem = (i) => {
    global = i ;

    inputs[0].value = Data[i].title;
    inputs[1].value = Data[i].price;
    inputs[2].value = Data[i].tax;
    inputs[3].value = Data[i].discount;
    inputs[4].value = Data[i].amount;
    inputs[5].value = Data[i].total;
    inputs[6].value = Data[i].type;
    
    
    createBtn.innerHTML = "Update Data";
}
//==========================================================

//==========================================================

//==========================================================

//==========================================================








