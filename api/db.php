<?php

use Medoo\Medoo;

header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$database = "app";
$username = "root";
$password = "";

// CREATE CONNECTION
$mysqli = new mysqli($servername, $username, $password, $database);

// Check connection
if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}
// echo "Connected successfully";

// Connect the database.
$database = new Medoo([
  'type' => 'mysql',
  'host' => 'localhost',
  'database' => 'app',
  'username' => 'root',
  'password' => ''
]);