<?php 

include_once __DIR__ . '/../models/emoji.php';
header('Content-Type: application/json');

if ($_REQUEST['action'] === 'index'){
  echo 'hi fren';
  echo json_encode(Emojis::all());
}

?>