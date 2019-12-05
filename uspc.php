<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

require ("../.private/cs_realized.php");
$mysqli = new mysqli($mysql_host,$mysql_username,$mysql_password,$mysql_database);

if ($mysqli->connect_error) {
    echo json_encode(array("status"=>"error","message"=>"Error Resolving USPC class."));

    die("Error : (". $mysqli->connect_errno .") ". $mysqli->connect_error);
}

$pair = array();

if (isset($_GET["cc"]))
{
    if (strpos($_GET["cc"],"/")) {
        if($statement = $mysqli->prepare("SELECT distinct(subclass_id) FROM uspc_lookup where (mainclass_id = ?) and (subclass_id LIKE ?) ORDER BY subclass_id")){
            $pos = strpos($_GET["cc"],"/");
            $param = substr($_GET["cc"],$pos+1)."%";
            $statement->bind_param('ss', substr($_GET["cc"],0,$pos), $param);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($subclass_id);

            while ($statement->fetch()) {
                $pair[] =  substr($_GET["cc"],0,$pos+1).$subclass_id;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else
    {
        if($statement = $mysqli->prepare("SELECT distinct(mainclass_id) FROM uspc_lookup where (mainclass_id LIKE ?) ORDER BY mainclass_id")){
                $param = "%".$_GET["cc"]."%";
                $statement->bind_param('s',$param);
                $statement->execute();
                $statement->store_result();
                $statement->bind_result($mainclass_id);

                while ($statement->fetch()) {
                    $pair[] = $mainclass_id;
                }

                $statement->free_result();
                $statement->close();
        }
    }
}

$mysqli->close();

echo json_encode($pair);

?>