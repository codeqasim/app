<?php

// ======================== LOGIN
$router->post('login', function() {

    include "db.php";

    required("email");
    required("password");

    // POST QUERY
    $email = $_POST['email'];
    $password = md5($_POST['password']);

    // DB QUERY
    $user_info = $db->select("users","*", [
        "email" => $email,
        "password" => $password,
    ]);

    if (!empty($user_info)){
        $respose = array ( "status"=>"true", "message"=>"user details", "data"=> $user_info );
    } else {
        $respose = array ( "status"=>"false", "message"=>"no user found", "data"=> null );
    }

    echo json_encode($respose);

});

// ======================== SIGNUP
$router->post('signup', function() {
    
    include "db.php";

    // VALIDATION
    required("first_name");
    required("last_name");
    required("email");
    required("password");

    $mob = $new_str = str_replace(' ', '', $_POST['mobile']);
    $mobile = preg_replace('/[^A-Za-z0-9\-]/', '', $mob); // removes special chars.
    $mail_code = rand(100000, 999999);
    $mobile_code = rand(100000, 999999);

    $rand = rand(100000000, 999999999);
    $date = date('Ymdhis');
    $ref_id = $date.$rand;

    // EMAIL CHECK
    $exist_mail = $db->select('users', [ 'email', ], [ 'email' => $_POST['email'], ]);
    if (isset($exist_mail[0]['email'])) {
    $respose = array ( "status"=>"false", "message"=>"email already exist please use new email", "data"=> "" );
    echo json_encode($respose);
    die;
    }

    if(isset($_POST['user_id'])) { $user_id = $_POST['user_id']; } else { $user_id = ""; }
    if(isset($_POST['password'])) { $password = $_POST['password']; } else { $password = 00000000; }
    if(isset($_POST['country_code'])) { $country_code = $_POST['country_code']; } else { $country_code = ""; }
    if(isset($_POST['owner_id'])) { $owner_id = $_POST['owner_id']; } else { $owner_id = ""; }
    
    // DB QUERY
    $db->insert("users", [
        "owner_id" => $owner_id,
        "user_id" => $ref_id,
        "first_name" => $_POST['first_name'],
        "last_name" => $_POST['last_name'],
        "email" => $_POST['email'],
        "mobile" => $_POST['mobile'],
        "country_code" => $_POST['country_code'],
        "email_code" => $mail_code,
        "password" => md5($password)
    ]);

    $user_info = $db->select("users","*", [
        "id" => $db->id()
    ]);

    $respose = array ( "status"=>"true", "message"=>"account registered successfully.", "data"=> $user_info );
    echo json_encode($respose);

});

// ======================== EMAIL VERIFICATION
$router->post('account/verify_email', function() {

    include "db.php";
    if(isset($_POST['mobile']) && trim($_POST['mobile']) !== "") {} else { echo "mobile - param or value missing "; die; }

    $mobile = mysqli_real_escape_string($mysqli, $_POST['mobile']);
    $i = $mysqli->query("SELECT * FROM `users` WHERE `mobile` = '".$mobile."'")->fetch_object();

    if ($i->email_code == $_POST['email_code']) {

        if (isset($i->id)) { $x = $mysqli->query("UPDATE `users` SET `email_verification`='1' WHERE id='".$i->id."'"); }

    } else {
        $respose = array ( "status"=>"false", "message"=>"email code invalid.", "data"=> '' );
        echo json_encode($respose);
        die;
    }

    $respose = array ( "status"=>"true", "message"=>"email verified.", "data"=> $x, );
    echo json_encode($respose);

});

$router->post('account/resend_verification_email', function() {
    include "db.php";
    if(isset($_POST['mobile']) && trim($_POST['mobile']) !== "") {} else { echo "mobile - param or value missing "; die; }
    $mob = $new_str = str_replace(' ', '', $_POST['mobile']);
    $mobile = preg_replace('/[^A-Za-z0-9\-]/', '', $mob); // removes special chars.

    $q = $mysqli->query("SELECT * FROM `users` WHERE `mobile` = '".$mobile."'")->fetch_object();

    // VALIDATION
    if(isset($q->email) && trim($q->email) !== "") {} else {
        $respose = array ( "status"=>"false", "message"=>"no account found with this number contact support", "data"=> '' );
        echo json_encode($respose);
     die; }

    // print_r($q->email);

    // include "mail.php";
    // $mg->messages()->send($SENDER_DOMAIN, [
    //     'from'    => 'Khudcar <postmaster@khudcar.com>',
    //     'to'      => ''.$q->name.' <'.$q->email.'>',
    //     'subject' => 'Hello '.$q->name.'',
    //     'template'    => 'signup_khudar',
    //     'h:X-Mailgun-Variables'    => '{"link": "https://khudcar.com/accounts/verification/email/'.$q->email_code.'/'.$q->mobile.'"}'
    // ]);

    $respose = array ( "status"=>"true", "message"=>"email verification sent please check your mailbox if not found check spam folder", "data"=> $q );
    echo json_encode($respose);

});


// ======================== USER UPDATE
$router->post('user_update', function() {

    include "db.php";

    // VALIDATION PARAMS
    // if(isset($_POST['email']) && trim($_POST['email']) !== "") {} else { echo "email - param or value missing "; die; }

    // CHECK IF EMAIL EXIST
    $sql = "SELECT * FROM users WHERE user_id = '".$_POST['user_id']."'";
    $res=mysqli_num_rows(mysqli_query($mysqli, $sql));
    if($res == 0) {
    $respose = array ( "status"=>"false", "message"=>"no account found with this user id.", "data"=> '' );
    echo json_encode($respose);
    die;
    }

    if ($_SERVER['REQUEST_METHOD']=$_POST){

        // print_r($_POST);

        $email = $new_str = str_replace(' ', '', $_POST['email']);
        $mob = $new_str = str_replace(' ', '', $_POST['mobile']);
        $mobile = preg_replace('/[^A-Za-z0-9\-]/', '', $mob); // removes special chars.

        // `password` = '".md5($_POST['password'])."',

        $query = "UPDATE `users` SET
        `first_name` = '".$_POST['first_name']."',
        `last_name` = '".$_POST['last_name']."',
        `email` = '".$_POST['email']."',
        `mobile` = '".$_POST['mobile']."',
        `country_code` = '".$_POST['country_code']."'
        WHERE `users`.`user_id` = '".$_POST['user_id']."';";

        $result = mysqli_query($mysqli, $query);

        if ($result == false ) {
            $respose = array ( "status"=>"false", "message"=>"Something went wrong please check", "data"=> null );
        } else {
            $respose = array ( "status"=>"true", "message"=>"account updated successfully.", "data"=> "" );
        }
        echo json_encode($respose);
        }
});

// ======================== FORGET PASSWORD
$router->post('login-reset', function() {
    include "db.php";

    // VALIDATION
    if(isset($_POST['email']) && trim($_POST['email']) !== "") {} else { echo "email - param or value missing "; die; }

    if ($_SERVER['REQUEST_METHOD']=$_POST){

        $email = $new_str = str_replace(' ', '', $_POST['email']);

        $new_password = rand(100000, 999999);

        // echo $new_password; die;

        $user = $mysqli->query('SELECT * FROM users WHERE email = "'.$email.'"')->fetch_object();

        // print_r(json_encode($user_info));

        if ($user == null ) {
            $respose = array ( "status"=>"false", "message"=>"invalid email", "data"=> null );
            echo json_encode($respose);
        } else {

            $query = "UPDATE `users` SET `password` = '".md5($new_password)."' WHERE `users`.`email` = '".$email."';";

            $result = mysqli_query($mysqli, $query);

            $respose = array ( "status"=>"true", "message"=>"password updated successfully","password" => $new_password, "data"=> $user );
            echo json_encode($respose);

            $mail = [
                'name'=>$user->first_name,
                'email'=>$_POST['email'],
                'subject'=>'Password Reset',
                'content_title'=>'Your password has been reset',
                'content'=>'Please find your new password below',
                'link'=>'',
                'code'=>$new_password
            ];
            mailer($mail);

        }

    }
});

// ======================== USER PROFILE
$router->post('user_profile', function() {

    include "db.php";

    $data = $database->select('users', "*", [
        'user_id' => $_POST['user_id'],
   ]);

   if (!empty($data)) {
    $respose = array ( "status"=>"true", "message"=>"user details found.", "data"=> $data );

        } else {
            $respose = array ( "status"=>"true", "message"=>"account found successfully.", "data"=> '' );
        }
        echo json_encode($respose);
});

// ======================== DELETE USER
$router->post('delete-user', function() {

    include "db.php";
    $data = $db->delete('users', [
        "AND" => [
        'user_id' => $_POST['user_id'],
        ]
   ]);

   if ($data->rowCount() == 1) {
    $respose = array ( "status"=>"true", "message"=>"user deleted.", "data"=> $data->rowCount() );
   } else {
    $respose = array ( "status"=>"false", "message"=>"user not deleted.", "data"=> $data->rowCount() );
   }
   echo json_encode($respose);

});

// ======================== CONTACTS
$router->post('contacts', function() {

    include "db.php";

    if (isset($_POST['user_id'])) {
        $id = $_POST['user_id'];

        $data = $db->select('users', [
            'id',
            'user_id',
            'first_name',
            'last_name',
            'email',
            'mobile',
            'country_code',
            'user_status'
        ], [
            'owner_id' => $id,
       ]);
    }

    if (isset($_POST['owner_id'])) {
        $id = $_POST['owner_id'];

        $data = $db->select('users', [
            'id',
            'user_id',
            'first_name',
            'last_name',
            'email',
            'mobile',
            'country_code',
            'user_status'
        ], [
            'owner_id' => $id,
       ]);
    }

    if (isset($_POST['user_id'])) {
        $user_id = $_POST['user_id'];

        $data = $db->select('users', [
            'id',
            'user_id',
            'first_name',
            'last_name',
            'email',
            'mobile',
            'country_code',
            'user_status'
        ], [
            'user_id' => $user_id,
       ]);
    }

    if (isset($_POST['email'])) {
        $email = $_POST['email'];
        $owner_id = $_POST['owner_id'];

        $data = $db->select('users', [
            'id',
            'user_id',
            'first_name',
            'last_name',
            'email',
            'mobile',
            'country_code',
            'user_status'
        ], [
            'email' => $email,
            'owner_id' => $owner_id,
       ]);
    }

    if (isset($_POST['first_name'])) {
        $first_name = $_POST['first_name'];
        $owner_id = $_POST['owner_id'];

        $data = $db->select('users', [
            'id',
            'user_id',
            'first_name',
            'last_name',
            'email',
            'mobile',
            'country_code',
            'user_status'
        ], [
            'first_name' => $first_name,
            'owner_id' => $owner_id,
       ]);
    }

    if (isset($_POST['last_name'])) {
        $last_name = $_POST['last_name'];
        $owner_id = $_POST['owner_id'];

        $data = $db->select('users', [
            'id',
            'user_id',
            'first_name',
            'last_name',
            'email',
            'mobile',
            'country_code',
            'user_status'
        ], [
            'last_name' => $last_name,
            'owner_id' => $owner_id,
       ]);
    }

    if (isset($_POST['mobile'])) {
        $mobile = $_POST['mobile'];
        $owner_id = $_POST['owner_id'];

        $data = $db->select('users', [
            'id',
            'user_id',
            'first_name',
            'last_name',
            'email',
            'mobile',
            'country_code',
            'user_status'
        ], [
            'mobile' => $mobile,
            'owner_id' => $owner_id,
       ]);
    }

    if (isset($_POST['country_code'])) {
        $country_code = $_POST['country_code'];
        $owner_id = $_POST['owner_id'];

        $data = $db->select('users', [
            'id',
            'user_id',
            'first_name',
            'last_name',
            'email',
            'mobile',
            'country_code',
            'user_status'
        ], [
            'country_code' => $country_code,
            'owner_id' => $owner_id,
       ]);
    }

       $c = array_reverse($data);

        if (!empty($c)) {
            $respose = array ( "status"=>"true", "message"=>"users details", "data"=> $c );
        } else {
            $respose = array ( "status"=>"false", "message"=>"no users found", "data"=> null );
}

echo json_encode($respose);

});

?>