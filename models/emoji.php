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
  static function create($emoji){
    $query = "INSERT INTO emojis( name, referenceimg, description) VALUES ($1, $2, $3)";
    $query_params = array($emoji->name, $emoji->referenceimg, $emoji->description);
    pg_query_params($query, $query_params);
    return self::all();
  }

  //update post here
  static function update($updated_emoji){
    $query = "UPDATE emojis SET name = $1, referenceimg = $2, description = $3 WHERE id = $4";
    $query_params = array($updated_emoji->name, $updated_emoji->referenceimg, $updated_emoji->description, $updated_emoji->id);
    pg_query_params($query, $query_params);
    return self::all();
  }

  //delete post here
  static function delete($id){
    $query = "DELETE FROM emojis WHERE id = $1";
    $query_params = array($id);
    $result = pg_query_params($query, $query_params);
    return self::all();
  }
}

?>