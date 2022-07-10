<?php 

// ======================== FIRST CATEGORY 
$router->get('categories/main', function() {
    include "db.php";

    $db = mysqli_query($mysqli, "SELECT * FROM categories WHERE category_status='1' AND category_type = 'main' ORDER BY category_id DESC LIMIT 500");
    $rows = array();
    while($row = mysqli_fetch_assoc($db)) {
    $rows[] = $row;
    }
            if ($rows == false ) { 
                $respose = array ( "status"=>"false", "message"=>"no category found", "data"=>$rows );
            } else {
                $respose = array ( "status"=>"true", "message"=>"list of categories.", "data"=>$rows );
            }
            echo json_encode($respose);

});

// ======================== SUB CATEGORY 
$router->get('categories/sub', function() {
    include "db.php";

    $db = mysqli_query($mysqli, "SELECT * FROM categories WHERE category_status='1' AND category_type = 'sub' ORDER BY category_id DESC LIMIT 500");
    $rows = array();
    while($row = mysqli_fetch_assoc($db)) {
    $rows[] = $row;
    }
            if ($rows == false ) { 
                $respose = array ( "status"=>"false", "message"=>"no sub category found", "data"=>$rows );
            } else {
                $respose = array ( "status"=>"true", "message"=>"list of sub categories.", "data"=>$rows );
            }
            echo json_encode($respose);

});

// ======================== SUB SUB CATEGORY 
$router->get('categories/sub_sub', function() {
    include "db.php";

    $db = mysqli_query($mysqli, "SELECT * FROM categories WHERE category_status='1' AND category_type = 'sub_sub' ORDER BY category_id DESC LIMIT 500");
    $rows = array();
    while($row = mysqli_fetch_assoc($db)) {
    $rows[] = $row;
    }
            if ($rows == false ) { 
                $respose = array ( "status"=>"false", "message"=>"no sub sub category found", "data"=>$rows );
            } else {
                $respose = array ( "status"=>"true", "message"=>"list of sub sub categories.", "data"=>$rows );
            }
            echo json_encode($respose);

});

?>
