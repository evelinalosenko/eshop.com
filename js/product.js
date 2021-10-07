var cart = {};
function init() {
    var hash = window.location.hash.substr(1);
    console.log(hash);
    $.post(
        "admin/core.php",
        {
             "action" : "loadSingleGoods", 
             "id" : hash
        },
        goodsOut
    );
}

function goodsOut(data) {
    
    data = JSON.parse(data);
    console.log(data);
    var out='';
    var view = "";
    if(data != 0){
        out +='<div class="left-column">';
        out +='<img class="img" src="images/'+data.img+'" alt="">';
        out +='</div>';
        out +='<div class="right-column">';
        out +='<p class="name">'+data.name+'</p>';
        out +='<div class="descrip">'+data.description+'</div>';
        out +='<div class="cost">'+data.cost+'</div>';
        
        out +='<button class="add-to-cart" data-id="'+data.id+'">Купить</button>';
        out +='</div>';
        
        $('.goods-out').html(out);
        
        $('.add-to-cart').on('click', addToCart);
    }
    else{
        $('.goods-out').html('no product');
    }
}

function addToCart() {
    
    var id = $(this).attr('data-id');

    if (cart[id] == undefined) {
        cart[id] = 1; 
    }
    else {
        cart[id]++; 
    }
    
    showMiniCart();
    saveCart();
}


function saveCart() {
   
    localStorage.setItem('cart', JSON.stringify(cart)); 
}

function showMiniCart() {
   
    var sum  = 0;
    for (var key of Object.values(cart)) {
        alert(key);
        sum +=  key + cart[key] + '<br>';
    }
    var out = "";
    for (var key in cart) {
        
        out +=  key + '==' + cart[key] + '<br>';
        
    }
    $('.mini-cart').html(out);
}

function loadCart() {
    
    if (localStorage.getItem('cart')) {
        
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

$(document).ready(function () {
    init();
    loadCart();
});