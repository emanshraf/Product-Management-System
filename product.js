let title = document.getElementById("title");
let price = document.getElementById("price");
let texes = document.getElementById("texes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let tbody = document.getElementById("tbody");


let mood = 'creat';
let temp ;



//Get Total

function getTotal(){
    if(price.value != ''){
       let result = (+price.value + +texes.value + +ads.value) - +discount.value;
       total.innerHTML = result;
       total.style.background="green";
    }
    else{
        total.innerHTML = '';
       total.style.background="rgb(85, 87, 185)";
    }
}

//Creat Product

let productes;
if(localStorage.product != null){
    productes = JSON.parse(localStorage.product);
}
else{
    productes = [];
}

submit.onclick = function(){
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        texes:texes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value !='' && price.value!='' && category.value !='' && newProduct.count <=100){
    if(mood === 'creat'){
        if(newProduct.count>1){
            for(let i=0; i<newProduct.count; i++){
                productes.push(newProduct); 
            }
        }else{
                productes.push(newProduct);
            }
    }else{
        productes[temp] = newProduct;
        mood = 'creat';
        submit.innerHTML = 'creat';
        count.style.display = 'block';
    }
    clearInputs();
}
    localStorage.setItem('product', JSON.stringify(productes));

    viewData();
}

//Clear inputs

function clearInputs(){

        title.value='';
        price.value='';
        texes.value='';
        ads.value='';
        discount.value='';
        total.innerHTML='';
        count.value='';
        category.value='';
}

//viwe data
function viewData(){
    getTotal();
    let table = '';
    for(let i=0; i< productes.length; i++) {
       
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${productes[i].title}</td>
    <td>${productes[i].price}</td>
    <td>${productes[i].texes}</td>
    <td>${productes[i].ads}</td>
    <td>${productes[i].discount}</td>
    <td>${productes[i].total}</td>
    <td>${productes[i].category}</td>
    <td><button onclick="update(${i})" id="update" >update</button></td>
    <td><button onclick="delet(${i})" id="delet" >delet</button></td>
    </tr>
    `  
    }
    tbody.innerHTML =  table; 
   
let delet_all = document.getElementById("deletAll");
    if(productes.length>0){
        delet_all.innerHTML = `
        <button onclick="deletAll()">delet all (${productes.length})</button>`
    }else{
        delet_all.innerHTML = ` `
    }
}
viewData();

//delet element
function delet(i){
productes.splice(i,1);
localStorage.product= JSON.stringify(productes);
viewData();
}

//delet All
function deletAll(){
    productes.splice(0);
    localStorage.clear();
    viewData();
}

//update element
function update(i){
    title.value = productes[i].title;
    price.value = productes[i].price;
    texes.value = productes[i].texes;
    ads.value = productes[i].ads;
    discount.value = productes[i].discount;
    getTotal();
    category.value = productes[i].category;
    count.style.display = 'none';
 
    submit.innerHTML = 'Update';

    mood = 'update';
    temp = i;

    scroll({
        top:0,
        behavior:'smooth',
    })
}

//search
let SearchMoode = 'title';
function getSearchMoode(id){
    let search = document.getElementById('search');
    if(id == 'saerchTitle' ){
        SearchMoode = 'title';
    }else{
        SearchMoode = 'category';
    }
    search.placeholder = 'Saerch By '+ SearchMoode;
    search.focus();
    search.value = '';
    viewData();
}

function searchData(value){
    let table = '';
    for(let i=0; i< productes.length; i++){

    if(SearchMoode == 'title'){

        if(productes[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${productes[i].title}</td>
            <td>${productes[i].price}</td>
            <td>${productes[i].texes}</td>
            <td>${productes[i].ads}</td>
            <td>${productes[i].discount}</td>
            <td>${productes[i].total}</td>
            <td>${productes[i].category}</td>
            <td><button onclick="update(${i})" id="update" >update</button></td>
            <td><button onclick="delet(${i})" id="delet" >delet</button></td>
            </tr>`   ;
        }}
    else{
            if(productes[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i+1}</td>
                <td>${productes[i].title}</td>
                <td>${productes[i].price}</td>
                <td>${productes[i].texes}</td>
                <td>${productes[i].ads}</td>
                <td>${productes[i].discount}</td>
                <td>${productes[i].total}</td>
                <td>${productes[i].category}</td>
                <td><button onclick="update(${i})" id="update" >update</button></td>
                <td><button onclick="delet(${i})" id="delet" >delet</button></td>
                </tr> `   ;
            }} }
            tbody.innerHTML =  table;
}


