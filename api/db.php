<?php

use Medoo\Medoo;

header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');

// FUNCTION FOR REQUIRED PARAMS
function required($val){ if(isset($_REQUEST[$val]) && trim($_POST[$val]) !== "") {} else { echo $val." - param or value missing "; die; } }

$servername = "localhost";
$database = "app";
$username = "root";
$password = "";

// Connect the database.
// $database = new Medoo([
//   'type' => 'mysql',
//   'host' => 'localhost',
//   'database' => 'app',
//   'username' => 'root',
//   'password' => ''
// ]);

$db = new Medoo([
    'type' => 'sqlite',
    'database' => 'db/db.db'
]);