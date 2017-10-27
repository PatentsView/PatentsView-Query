<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

require ("../.private/cs.php");
$mysqli = new mysqli($mysql_host,$mysql_username,$mysql_password,"QueryTool");

if ($mysqli->connect_error) {
    echo json_encode(array("status"=>"error","message"=>"Error Resolving Location."));

    die("Error : (". $mysqli->connect_errno .") ". $mysqli->connect_error);
}

$pair = array();

if (isset($_GET["id"]))
{
     if (isset($_GET["c"])) //country
     {
         if($statement = $mysqli->prepare("SELECT distinct(countryCode) FROM locations WHERE (countryName = ?)")){
            $param = trim($_GET["c"]);
            $statement->bind_param('s',$param);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($countryCode);

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $pair[] = $countryCode;
            }

            $statement->free_result();
            $statement->close();
        }
     }
}
else if (isset($_GET["cc"]))
{
    if (isset($_GET["r"]))
    {
        if (isset($_GET["r"]) && $_GET["r"]=="c") //city
        {
            if($statement = $mysqli->prepare("SELECT distinct(city) FROM locations where (countryName = ?) AND (city LIKE ?) ORDER BY city")){
                $param = $_GET["c"].'%';
                $statement->bind_param('ss',$_GET["cc"], $param);
                $statement->execute();
                $statement->store_result();
                $statement->bind_result($city);

                while ($statement->fetch()) {
                    $pair[] = $city;
                }

                $statement->free_result();
                $statement->close();
            }
        }
        else if (isset($_GET["r"]) && $_GET["r"]=="s") { //state
            if($statement = $mysqli->prepare("SELECT distinct(stateFull) FROM locations where (countryName = ?) AND (stateFull LIKE ?) ORDER BY stateFull")){
                $param = $_GET["s"].'%';
                $statement->bind_param('ss',$_GET["cc"], $param);
                $statement->execute();
                $statement->store_result();
                $statement->bind_result($state);

                while ($statement->fetch()) {
                    $pair[] = $state;
                }

                $statement->free_result();
                $statement->close();
            }
        }
    }
    else
    {
        if($statement = $mysqli->prepare("SELECT distinct(countryName) FROM locations WHERE (countryName LIKE ?) order by countryName")){
            $param = $_GET["cc"].'%';
            $statement->bind_param('s',$param);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($countryName);

            while ($statement->fetch()) {
                $pair[] = $countryName;
            }

            $statement->free_result();
            $statement->close();
        }
    }
}


$mysqli->close();

echo json_encode($pair);

?>