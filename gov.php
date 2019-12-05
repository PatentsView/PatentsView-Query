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

if (isset($_GET["n"]))
{
    if($statement = $mysqli->prepare("SELECT distinct(name) FROM gov_org WHERE (name is not null AND name LIKE ?) order by name LIMIT 20")){
        $param = $_GET["n"].'%';
        $statement->bind_param('s',$param);
        $statement->execute();
        $statement->store_result();
        $statement->bind_result($name);

        while ($statement->fetch()) {
            $pair[] = $name;
        }

        $statement->free_result();
        $statement->close();
    }
}
else if (isset($_GET["lo"]))
{
    if($statement = $mysqli->prepare("SELECT distinct(level_one) FROM gov_org WHERE (level_one is not null AND level_one LIKE ?) order by level_one LIMIT 20")){
        $param = $_GET["lo"].'%';
        $statement->bind_param('s',$param);
        $statement->execute();
        $statement->store_result();
        $statement->bind_result($topLevel);

        while ($statement->fetch()) {
            $pair[] = $topLevel;
        }

        $statement->free_result();
        $statement->close();
    }
}
else if (isset($_GET["ltw"]))
{
    if($statement = $mysqli->prepare("SELECT distinct(level_two) FROM gov_org WHERE (level_two is not null AND level_two LIKE ?) order by level_two LIMIT 20")){
        $param = $_GET["ltw"].'%';
        $statement->bind_param('s',$param);
        $statement->execute();
        $statement->store_result();
        $statement->bind_result($levelTwo);

        while ($statement->fetch()) {
            $pair[] = $levelTwo;
        }

        $statement->free_result();
        $statement->close();
    }
}
else if (isset($_GET["lth"]))
{
    if($statement = $mysqli->prepare("SELECT distinct(level_three) FROM gov_org WHERE (level_three is not null AND level_three LIKE ?) order by level_three LIMIT 20")){
        $param = $_GET["lth"].'%';
        $statement->bind_param('s',$param);
        $statement->execute();
        $statement->store_result();
        $statement->bind_result($levelThree);

        while ($statement->fetch()) {
            $pair[] = $levelThree;
        }

        $statement->free_result();
        $statement->close();
    }
}

$mysqli->close();

echo json_encode($pair);

?>

