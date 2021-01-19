'use strict';


let product={
  id1:{
    id: 1,
    name: 'Pizza',
    price: [500,800,1100],
    price_units: 'р',
    size: [30,40,50],
    size_units:'cm'
  },

  id2:{
    id:2,
    name: 'Cake',
    price: [1200,1600,2100],
    price_units: 'р',
    size: [1.0,1.7,2.2],
    size_units:'kg',
  },

  id3:{
    id:3,
    name: 'Burger',
    price: [150,250, 330],
    price_units: 'р',
    size: ['Medium','Large','XLarge'],
    size_units: undefined
  },
  id4:{
    id: 4,
    name: 'Coca-Cola',
    price: ['123','456','789'],
    price_units: 'р',
    size: [0.3,0.5,0.8],
    size_units: 'L'
  },

}





function get_product_length_plus1(){
var len=0
for (let i in product){
  ++len
 // console.log(product[i])
}
++len
  return len

}



var product_list_html = document.getElementById('product_list')

function generate_product_list(){

product_list_html.innerHTML=' '
  for (let i in product){
  //console.log(product[i])
  if(product[i].name != 'DELETED'){

product_list_html.innerHTML+=`
<br>
<div>
<div class="product_name" id="${product[i].id}">
${product[i].name} 
</div>
${generate_radio_selector(product[i])}
<br>
<button id="${product[i].id}_minus">-</button>
Количество <span id="${product[i].id}_total">0</span>
<button id="${product[i].id}_plus">+</button>
</div>
`}
}
}



function generate_radio_selector(id) {
  let html=[]

  for (let i =0; i<id.price.length; ++i){
  html+=(`
    <input type="radio" id="size${i}"
       name="${id.id}" >
      <label for="${id.id}">
      ${id.name} 
      ${id.size[i] +dropnull(id.size_units)}
      </label>
      <span class="price"> ${id.price[i] + id.price_units}</span>
      `)}
  return html
}


function dropnull(size_units){
  if (size_units!=undefined){
    return size_units}
  else{return ' '}
  }



//console.log(generate_radio_selector(product.id1))


generate_product_list()


document.getElementById('add_new_prod').addEventListener('click',
  function(){
    add_new_product_to_dict()
    generate_product_list()

  })



function get_new_product_data(){


 var prod_name = document.getElementById('prod_name').value
 
 var prod_price_list =document.getElementById('prod_price_list').value.split(',')
 var prod_price_currency =document.getElementById('prod_price_currency').value
 var prod_size_list =document.getElementById('prod_size_list').value.split(',')
 var prod_size_currency =document.getElementById('prod_size_currency').value

console.log(prod_price_list)

 return [prod_name,prod_price_list,prod_price_currency,
 prod_size_list, prod_size_currency]
}


function add_new_product_to_dict(){
  var lst=get_new_product_data()


  var len= get_product_length_plus1()

  var idname= `id${len}`
  product[idname]={}
  product[idname].id=len
  product[idname].name=lst[0]
  product[idname].price=lst[1].map(function (x) { 
  return parseInt(x, 10); })

  product[idname].price_units=lst[2]
  product[idname].size=lst[3]
  product[idname].size_units=lst[4]


  console.log(product)
}

function deleteproduct(id){
delete product[id]
product[id]={}
product[id].name = "DELETED"
generate_product_list()
}




document.getElementById('delete_prod').addEventListener('click',
  function(){
    var delete_prod_imput = document.getElementById('delete_prod_imput').value
    deleteproduct(delete_prod_imput)

  })


var fruits = ["Banana", "Orange", "Apple", "Mango"];
var energy = fruits.join();
console.log(energy)