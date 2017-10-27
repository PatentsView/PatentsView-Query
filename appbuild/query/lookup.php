<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

require ("../.private/cs.php");
$mysqli = new mysqli($mysql_host,$mysql_username,$mysql_password,"QueryTool");

if ($mysqli->connect_error) {
    echo json_encode(array("status"=>"error","message"=>"Error Resolving Query."));

    die("Error : (". $mysqli->connect_errno .") ". $mysqli->connect_error);
}

$pair = array();

if (strlen(ltrim($_GET["s"])) < 4) {
    $query = "SELECT title FROM QueryTool.".$_GET["t"]." where title is not null and title like ? order by title limit 25";
    $param_value = '%'.$_GET["s"].'%';
}
else {
    $query = "SELECT title FROM QueryTool.".$_GET["t"]." where title is not null and match(title) against(? in boolean mode) order by title limit 25";
    $param_value = '"'.$_GET["s"].'"';
}

if($statement = $mysqli->prepare($query))
{

    $param = $param_value;
    $statement->bind_param('s', $param);
    $statement->execute();
    $statement->store_result();
    $statement->bind_result($title);

    while ($statement->fetch()) {
        $pair[] = $title;
    }

    $statement->free_result();
    $statement->close();
}

$mysqli->close();

echo json_encode($pair);

?>