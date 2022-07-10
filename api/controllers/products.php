<?php 

// ======================== SIGNUP 
$router->post('product/add', function() {
    include "db.php";

        // VALIDATION
        if(isset($_POST['user_id']) && trim($_POST['user_id']) !== "") {} else { echo "user_id - param or value missing "; die; }
        $desc = str_replace("'", '&#39;', $_POST['product_desc']);

 
        if ($_SERVER['REQUEST_METHOD']=$_POST){

        $query = "INSERT INTO `products` (`product_id`, `product_img`, `product_user_id`, `product_cat_main_id`, `product_cat_sub_id`, `product_cat_sub_sub_id`, `product_name`, `product_desc`, `product_features`, `product_city_id`, `product_created_at`, `product_updated_at`) VALUES 
        (NULL, 'img', '".$_POST['user_id']."', '".$_POST['category_main']."', '".$_POST['category_sub']."', '".$_POST['category_sub_sub']."', '".$_POST['product_name']."', '".$desc."', '".$_POST['product_features']."', '".$_POST['product_city_id']."', current_timestamp(), current_timestamp()); ";

        $result = mysqli_query($mysqli, $query);

        $product = $mysqli->query('SELECT * FROM products ORDER BY product_id DESC LIMIT 1')->fetch_object();
        
        if ($result == false ) { 
            $respose = array ( "status"=>"false", "message"=>"something went wrong.", "data"=> $result );
        } else {
            $respose = array ( "status"=>"true", "message"=>"product added successfully.", "data"=> $product );          
        }
        
        echo json_encode($respose);
        
        }
});

// ======================== PRODUCTS 
$router->post('products', function() {
    include "db.php";

    if(isset($_POST['user_id']) && trim($_POST['user_id']) !== "") {} else { echo "user_id - param or value missing "; die; }
    $db = mysqli_query($mysqli, "SELECT * FROM products WHERE product_user_id = '".$_POST['user_id']."' ORDER BY product_id DESC");
    $rows = array();
    while($row = mysqli_fetch_assoc($db)) {
    $rows[] = $row;
    }
    if ($rows == false ) { 
        $respose = array ( "status"=>"false", "message"=>"no products found", "data"=>$rows );
    } else {
        $respose = array ( "status"=>"true", "message"=>"products fetched successfully.", "data"=>$rows );
    }
    echo json_encode($respose);

});


?>