<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

require ("../.private/cs_realized.php");
$mysqli = new mysqli($mysql_host,$mysql_username,$mysql_password,$mysql_database);

if ($mysqli->connect_error) {
    echo json_encode(array("status"=>"error","message"=>"Error Resolving Organization."));

    die("Error : (". $mysqli->connect_errno .") ". $mysqli->connect_error);
}

$pair = array();

if (isset($_GET["o"]))
{
    if($statement = $mysqli->prepare("SELECT distinct(organization) FROM assignee_org WHERE (organization is not null AND organization LIKE ?) order by organization LIMIT 20")){
        $param = $_GET["o"].'%';
        $statement->bind_param('s',$param);
        $statement->execute();
        $statement->store_result();
        $statement->bind_result($organization);

        while ($statement->fetch()) {
            $pair[] = $organization;
        }

        $statement->free_result();
        $statement->close();
    }
}


$mysqli->close();

echo json_encode($pair);

?>

