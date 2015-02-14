<?php
$mysql_username = 'root'      ;
$mysql_password = 'keep calm' ;
$mysql_database = 'aidansean' ;
$mysql_prefix   = '' ;

$mysqli = new mysqli('localhost', $mysql_username, $mysql_password, $mysql_database) ;
if($mysqli->connect_error){
  die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error) ;
}
?>