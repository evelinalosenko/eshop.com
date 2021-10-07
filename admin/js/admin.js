function init() {
    $.post(
        "core.php",
        {
            "action" : "init"
        },
        showGoods
    );
}

function showGoods(data) {
    data = JSON.parse(data);
    //sconsole.log(data);
    var out='<select>';
    out +='<option data-id="0">New Items</option>';
    for (var id in data) {
        out +=`<option data-id="${id}">${data[id].name}</option>`;
    }
    out +='</select>';
    $('.goods-out').html(out);
    $('.goods-out select').on('change', selectGoods);
}
function selectGoods(){
    var id = $('.goods-out select option:selected').attr('data-id');
    console.log(id);
    $.post(
        "core.php",
        {
            "action" : "selectOneGoods",
            "gid" : id
        },
        function(data){
            console.log(data);
        }
    );
}

function selectGoods(){
    var id = $('.goods-out select option:selected').attr('data-id');
    console.log(id);
    $.post(
        "core.php",
        {
            "action" : "selectOneGoods",
            "gid" : id
        },
        function(data){
            data = JSON.parse(data);
            $('#newName').val(data.name);
            $('#newCost').val(data.cost);
            $('#newDescript').val(data.description);
            $('#newImg').val(data.img);
            $('#newOrd').val(data.ord);
            $('#gid').val(data.id);
        }
    );
}
function saveToDb(){
    var id = $('#gid').val();
    if(id != 0){
        $.post(
        "core.php",
            {
                "action" : "updateGoods",
                "id" : id,
                "newName" : $('#newName').val(),
                "newCost" : $('#newCost').val(),
                "newDescript" : $('#newDescript').val(),
                "newImg" : $('#newImg').val(),
                "newOrd" : $('#newOrd').val()
                
            },
            function (data){
                if(data == 1){
                    init();
                }
                else{
                    console.log(data);
                }
            }
        );
    }
    else{
        $.post(
        "core.php",
            {
                "action" : "newGoods",
                "id" : 0,
                "newName" : $('#newName').val(),
                "newCost" : $('#newCost').val(),
                "newDescript" : $('#newDescript').val(),
                "newImg" : $('#newImg').val(),
                "newOrd" : $('#newOrd').val()
                
            },
            function (data){
                if(data == 1){
                    init();
                }
                else{
                    alert("New record added!")
                    console.log(data);
                }
            }
        );
        
    }
}

$(document).ready(function () {
   init();
   $('.add-to-db').on('click', saveToDb);
});