var cart = {};
function loadCart() {
    
    if (localStorage.getItem('cart')) {
        
        cart = JSON.parse(localStorage.getItem('cart'));
            showCart();
        }
    else {
        $('.main-cart').html('Cart is empty!');
    }
}

function showCart() {
  
    if (!isEmpty(cart)) {
        $('.main-cart').html('Cart is empty!');
    }
    else {
        
        $.getJSON('goods.json', function (data) {
            
            var goods = data;
            var out = '';
            for (var id in cart) {
                out += '<button data-id="'+[id]+'" class="del-goods">x</button>';
                out += '<img src="images/'+goods[id].img+'">';
                out += '  <p class="name">'+goods[id].name+'</p>';
                out += '  <p class="">'+cart[id]+'</p>';
                out += '  <button data-id="'+[id]+'" class="plus-goods">+</button>  ';
                out += '  <button data-id="'+[id]+'" class="minus-goods">-</button>  ';
                out += '  <p class="cost">'+cart[id]*goods[id].cost+'</p>';
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    }
}

function delGoods() {
    
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    
    var id = $(this).attr('data-id');
    if(cart[id] == 1){
        delete cart[id];
    }
    else{
        cart[id]--;
    }
    
    saveCart();
    showCart();
}

function saveCart() {
    
    localStorage.setItem('cart', JSON.stringify(cart)); 
}

function isEmpty(object) {
    
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}
function sendEmail() {
    
    var cname = $('.Cname').val();
    var clastname = $('.Clastname').val();
    var cphone = $('.Cphone').val();
    var cemail = $('.Cmail').val();
    
    if(cname != '' && clastname != '' && cphone != '' && cemail != ''){
        if(isEmpty(cart)){
            $.post("core/mail.php", { "cname" : cname, "clastname" : clastname, "cphone" : cphone, "cemail" : cemail, "cart" : cart},
                   function(data){
                       alert(data);
                       if(data == 1){
                           alert('Order sent');
                       }else{
                           alert('Please try!');
                       }
                
                   }
            );
        }
        else{
            alert('Cart is empty!');
        }
    }
    else{
        alert('Please fill form!');
    }
    
}


$('document').ready(function () {
   loadCart();
    $('.send-email').on('click', sendEmail);
});