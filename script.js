'use strict';


var dops = 0

let product={
  id1:{
    id: 1,
    name: 'Pizza',
    price: [500,800,1100],
    price_units: 'р',
    size: [30,40,50],
    size_units:'cm',


    radio_selected: null,
    ordered: 0,
  },

  id2:{
    id:2,
    name: 'Cake',
    price: [1200,1600,2100],
    price_units: 'р',
    size: [1.0,1.7,2.2],
    size_units:'kg',

    radio_selected: null,
    ordered: 0,
  },

  id3:{
    id:3,
    name: 'Burger',
    price: [150,250, 330],
    price_units: 'р',
    size: ['Medium','Large','XLarge'],
    size_units: undefined,

    radio_selected: null,
    ordered: 0,
  },
  id4:{
    id: 4,
    name: 'Coca-Cola',
    price: [123,456,789],
    price_units: 'р',
    size: [0.3,0.5,0.8],
    size_units: 'L',

    radio_selected: null,
    ordered: 0,
  },

}


let cart = {
  addtocart(id, size_price){ //cюда вводить id в формате id1 id2 id3
    var len=-3
    for(let i in cart){
      //console.log(len)
      ++len
    }

        
    
    cart[`pos${len}`]={  
      id_pos:len,
      id:product[id].id,
      name:product[id].name,
      size:product[id].size[size_price],
      price:product[id].price[size_price],

      size_units:product[id].size_units,
      price_units:product[id].price_units

    }
   
    
  },


  get_total_amount(plus=dops){
    var len=0
    for(let i in cart){
      ++len
     // console.log(i)
    }
   // console.log('len',len)

    var amount=plus
    for(let i=1; i<len-3; i++){ //
      //console.log(i)
      if (cart[`pos${i}`].id !="DELETED"){
      amount+=cart[`pos${i}`].price
      //console.log(amount)
      //console.log(cart[`pos${i}`])
    }
  }
  document.getElementById('amount').innerHTML=amount
  console.log(amount)
  return amount
    },



  remove_from_cart(id_delete){ //cюда вводить id в формате 1 2 3
  var len=0
    for(let i in cart){
      ++len}
  //console.log(len-4)
  for(let i=len-4; i>0;  i--){
 //   console.log(i)

 //   console.log(cart[`pos${i}`].id)
    if(cart[`pos${i}`].id==id_delete){
     //console.log(cart[`pos${i}`]) 
     delete cart[`pos${i}`]
     cart[`pos${i}`]={}
     cart[`pos${i}`].id = "DELETED"

     cart.get_total_amount()
     break 
   }
  }

  },

  remove_from_cart_by_pos(pos_delete){//'pos1' //'pos2'

    
    //var s = "you can enter maximum 500 choices";
    //alert (s.match(r));
    console.log(cart[pos_delete].id)
    //document.getElementById(cart[pos_delete].id+'_minus').click()
    product['id'+cart[pos_delete].id].ordered--
    generate_product_list()
    delete cart[pos_delete]
    cart[pos_delete]={}
    cart[pos_delete].id = "DELETED"
    //console.log(parseInt(pos_delete))
    document.getElementById(`div_cart_pos${pos_delete}`).innerHTML=''
    
  
  

  }


}
/*
cart.addtocart('id3', 2)
cart.addtocart('id3', 2)
cart.addtocart('id3', 2)
cart.get_total_amount()
*/


cart.get_total_amount()
function add_to_cart_list(id_pos){
  //document.getElementById('buy_list').innerHTML=''
  //cart[id_pos]={}
  console.log(id_pos)
document.getElementById('buy_list').innerHTML+=`
<div id='div_cart_pos${id_pos}'>
${cart[id_pos].name}
${cart[id_pos].size}
${cart[id_pos].price}${cart[id_pos].price_units}
<button id='delete_${id_pos}' 
onclick="//alert('удалить');
console.log('${id_pos}')
cart.remove_from_cart_by_pos('${id_pos}');


console.log(cart);
cart.get_total_amount()

"

>Убрать из корзины</button>

</div>

`
}

//add_to_cart_list()





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
<button id="${product[i].id}_minus" hidden=''
 onclick="if(product.${i}.ordered>0) {product.${i}.ordered-- ; 
 //console.log(product.${i}.ordered);
document.getElementById('${product[i].id}_total').
innerHTML=product.${i}.ordered;

//console.log(product.${i}.id);
cart.remove_from_cart(product.${i}.id)

}
else{alert('нельзя меньше нуля')}
"

>-</button>

Количество <span id="${product[i].id}_total">${product[i].ordered}</span>




<button id="${product[i].id}_plus"
onclick="
if(product.${i}.radio_is_pressed==true){

product.${i}.ordered++ ;
document.getElementById('${product[i].id}_total').
innerHTML=product.${i}.ordered;

//console.log('id'+product.${i}.id, product.${i}.radio_selected)
cart.addtocart('id'+product.${i}.id, product.${i}.radio_selected)


//cart.add_to_cart_list('id'+product.${i}.id, product.${i}.radio_selected)
var len=-4;
for(let i in cart){
      ++len};

add_to_cart_list('pos'+len)

cart.get_total_amount()
}

else{
  console.log(product.${i}.radio_is_pressed)
  alert('сначала выберите размер!!!')
}

"
>+</button>
</div>
`
}
}
update_delete_list()
}

//cart.addtocart(product.${i}.id, product.${i}.radio_selected)
//cart.get_total_amount()





function generate_radio_selector(id) {
  let html=[]

  for (let i =0; i<id.price.length; ++i){
    //console.log(product['id'+id.id].radio_selected)
    
   
function abc(){
      if(product['id'+id.id].radio_selected== i)
        {
          return 'checked="checked"'
        }
      else{
        return 'pusto'}

        }


  html+=(`
    <input type="radio" id="id${id.id}size${i}"`)+
  abc()+
  (`

   
      
       onclick="product.id${id.id}.radio_is_pressed=true;
       product.id${id.id}.radio_selected=${i}
       console.log(product.id${id.id})
       console.log(product.id${id.id}.radio_selected)

        
      


       "
       name="${id.id}" >
      <label for="${id.id}">
      ${id.name} 
      ${id.size[i] +dropnull(id.size_units)}
      </label>
      <span class="price"> ${id.price[i] + id.price_units}</span>



      `)

  

  ///abc()
  
}


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

  product[idname].ordered=0
  product[idname].radio_selected=null

  console.log(product)
}

function deleteproduct(id){
  if(product[id]!=undefined){
  console.log(product[id])
delete product[id]
product[id]={}
product[id].name = "DELETED"
generate_product_list()}
else{alert('такого id нет и не было в списке!')
}
}




document.getElementById('delete_prod').addEventListener('click',
  function(){
    var delete_prod_imput = document.getElementById('delete_prod_imput').value
    deleteproduct(delete_prod_imput)

  })



function update_delete_list(){
document.getElementById('id_list').innerHTML=`
${preview_for_delete_list()}
`}


function preview_for_delete_list(){
  var lst=[]
for (let i in product){
  if(product[i].name!='DELETED'){
  lst.push([`<br>${i}, ${product[i].name}, price ${product[i].price}`])}}
return lst
}


function id_alert(i){
  alert(`id1size${i}`)
}


document.getElementById('admin').setAttribute('hidden', '')
//document.getElementById('admin').removeAttribute("hidden")


document.getElementById('password_input_button').addEventListener(
  'click', function(){
    if(document.getElementById('password_input').value=='0000'){

      document.getElementById('admin').removeAttribute("hidden")
      document.getElementById('password').setAttribute('hidden', '')
    }

    else{alert('wrong password!')}
  }

  )

document.getElementById('hide_admin').addEventListener(
  'click', function(){
    document.getElementById('admin').setAttribute('hidden', '')
    document.getElementById('password').removeAttribute('hidden', '')

  }
)




document.getElementById('additional1').addEventListener(
  'change',
  function(){
    if(document.getElementById('additional1').checked==true){
    dops+=250
    cart.get_total_amount(dops)
    }
    if(document.getElementById('additional1').checked==false){
    dops-=250
    cart.get_total_amount(dops)
    }
  })

document.getElementById('additional2').addEventListener(
  'change',
  function(){
    if(document.getElementById('additional2').checked==true){
    dops+=550
    cart.get_total_amount(dops)
    }
    if(document.getElementById('additional2').checked==false){
    dops-=550
    cart.get_total_amount(dops)
    }
  })


document.getElementById('additional3').addEventListener(
  'change',
  function(){
    if(document.getElementById('additional3').checked==true){
    dops+=750
    cart.get_total_amount(dops)
    }
    if(document.getElementById('additional3').checked==false){
    dops-=750
    cart.get_total_amount(dops)
    }
  })