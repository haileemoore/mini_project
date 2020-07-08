<?php 

$dbconn = pg_connect("host=localhost dbname=requestemojis");

class Emoji{
  public $id;
  public $name;
  public $referenceimg;
  public $description;

  public function __construct($id, $name, $referenceimg, $description){
    $this->id = $id;
    $this->name = $name;
    $this->referenceimg = $referenceimg;
    $this->description = $description;
  }
}

class Emojis {
  static function all(){
    $emojis = array();

    $results = pg_query("SELECT * FROM emojis");

    $row_object = pg_fetch_object($results);
    while($row_object){
      $new_emoji = new Emoji(
        intval($row_object->id),
        $row_object->name,
        $row_object->referenceimg,
        $row_object->description
      );
      $emojis[] = $new_emoji;
      $row_object = pg_fetch_object($results); 
    }
    return $emojis;
  }

  //create post here

  //update post here

  //delete post here
}

?>