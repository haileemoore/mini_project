<?php 

include_once __DIR__ . '/../models/emoji.php';
header('Content-Type: application/json');

if ($_REQUEST['action'] === 'index'){
  echo json_encode(Emojis::all());
} elseif ($_REQUEST['action'] === 'post'){
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $new_emoji = new Emoji(null, $body_object->name, $body_object->referenceimg, $body_object->description);
  echo json_encode(Emojis::create($new_emoji));
} elseif ($_REQUEST['action'] === 'update'){
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $updated_emoji = new Emoji($_REQUEST['id'], $body_object->name, $body_object->referenceimg, $body_object->description);
  $all_emojis = Emojis::update($updated_emoji);
  echo json_encode($all_emojis);
} elseif ($_REQUEST['action'] === 'delete'){
  $all_emojis = Emojis::delete($_REQUEST['id']);
  echo json_encode($all_emojis);
}

?>
