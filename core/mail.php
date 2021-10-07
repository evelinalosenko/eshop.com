<?php
$json = file_get_contents('../goods.json');
$json = json_decode($json, true);

$message = '';
$message .= '<h1> Order is in magzine</h1>';
$message .= '<p> Phone: '.$_POST['cphone'].'</p>'; 
$message .= '<p> Mail: '.$_POST['cemail'].'</p>'; 
$message .= '<p> Client: '.$_POST['cname'].'</p>';

$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id => $count){
    $message .= $json[$id]['name'];
    $message .= $count.' --- ';
    $message .= '<br>';
    $message .= $count * $json[$id]['cost'];
    $sum = $sum + $count * $json[$id]['cost'];
}
$message .= 'All: '.$sum;


$to = 'evelinalosenko@gmail.com'.',';
$to .= $_POST['cemail'];
$spectext = '<!DOCTUPE HTML><html><head><title>Order</title></head><body>';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'From: Your name <info@address.com>' . "\r\n";
$headers .= 'Content-type: text/html;  charset=utf-8' . "\r\n";

$m = mail($to, 'Your order was sent to center', $spectext.$message.'</body></html>', $headers);
if($m){
    echo 1;
}else{
    echo 0;
}