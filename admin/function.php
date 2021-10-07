<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "estore";

function connect(){
    $conn = mysqli_connect("localhost", "root", "", "estore");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}

function init(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT id, name FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}
function selectOneGoods(){
    $id = $_POST['gid'];
    $conn = connect();
    $sql = "SELECT * FROM goods WHERE id ='$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}
function updateGoods(){
    $conn = connect();
    $id = $_POST['id'];
    $newName = $_POST['newName'];
    $newCost = $_POST['newCost'];
    $newDescript = $_POST['newDescript'];
    $newImg = $_POST['newImg'];
    $newOrd = $_POST['newOrd'];

    
    $sql = "UPDATE goods SET name = '$newName', cost = '$newCost', description = '$newDescript', ord = '$newOrd', img = '$newImg' WHERE id='$id' ";

    if (mysqli_query($conn, $sql)) {
        echo "Record updated successfully";
    } 
    else {
        echo "Error updating record: " . mysqli_error($conn);
    }

    mysqli_close($conn);
    writeJSON();
}
function newGoods(){
    $conn = connect();
    $newName = $_POST['newName'];
    $newCost = $_POST['newCost'];
    $newDescript = $_POST['newDescript'];
    $newImg = $_POST['newImg'];
    $newOrd = $_POST['newOrd'];


    $sql = "INSERT INTO goods (name , cost, description, ord , img) VALUES ('$newName','$newCost','$newDescript','$newOrd','$newImg')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully  ";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    mysqli_close($conn);
    writeJSON();
}
function writeJSON(){
    $conn = connect();
    $sql = "SELECT * FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        $a = file_put_contents('../goods.json', json_encode($out));
        echo "New item id  ".$a;
    } else {
        echo "0";
    }
    mysqli_close($conn);

}
function loadGoods(){
    $conn = connect();
    //$type = $_POST['type'];
    //$sql = '';
    /*if($type != ''){
        $sql = "SELECT * FROM goods WHERE type = '$type'";
    }*/
    $sql = "SELECT * FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
       
    } else {
        echo "0";
    }
    mysqli_close($conn);
}
/*function loadByType(){
    $conn = connect();
    $type = $_POST['type'];
    
    if($type == ''){
        $sql = "SELECT * FROM goods WHERE type = '$type'";
    }
    
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
       
    } else {
        echo "0";
    }
    mysqli_close($conn);
}/*
/*function loadByType(){
    $type = $_POST['type'];
    $conn = connect();
    $sql = "SELECT * FROM goods WHERE type = 'board'";
    $result = mysqli_query($conn, $sql);

   if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["type"]] = $row;
        }
        echo json_encode($out);
       
    } else {
        echo "0";
    }
    mysqli_close($conn);
}*/
function loadSingleGoods(){
    $id = $_POST['id'];
    $conn = connect();
    $sql = "SELECT * FROM goods WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0){
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
       
    } else {
        echo "0";
    }
    mysqli_close($conn);
}