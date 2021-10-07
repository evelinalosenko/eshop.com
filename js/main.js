var cart = {}; 


var type;


 
function init(d) {
    
    
    type = d.getAttribute("data-id");
    if(type == 0){
        type = '';
    }
    $.post(
        "admin/core.php",
        {
             "action" : "loadGoods",
             "type" : type
        },
        goodsOut
    );
    
}


function goodsOut(data) {
    
    data = JSON.parse(data);
    console.log(data);
    var out='';
    for (var key in data) {
         out +='<div class="cart">';
         out += '<a class="productView" href="productView.html#'+[key]+'"><img src="images/'+data[key].img+'" alt=""></a>';
         out +='<p class="name">'+data[key].name+'</p>';
         out +='<div class="cost">'+data[key].cost+' EUR</div>'; 
         out +='<button class="add-to-cart" data-id="'+[key]+'">ADD to basket</button>';
         out +='</div>';
    }
    
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
    
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
    /

    /*var out = "";
    for (var key in cart) {
        
        out +=  key + '==' + cart[key] + '<br>'; // naitab hind eraldi
    }
    $('.mini-cart').html(out);*/
    var sum = 0;
    for(var key of Object.values(cart)) { 
        sum += key;
    }
     $('.mini-cart').html('CART' + ' (' + sum + ')');

    
}

function loadCart() {
  
    if (localStorage.getItem('cart')) {
       
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

/*window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;

  // 20 is an arbitrary number here, just to make you think if you need the prevScrollpos variable:
  if (currentScrollPos > 20) {
    // I am using 'display' instead of 'top':
    document.getElementById("cursor").style.display = "none";
  } else {
    document.getElementById("cursor").style.display = "initial";
  }
}*/

$(document).ready(function () {
    init();
    loadCart();
    
    
});



