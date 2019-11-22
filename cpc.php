<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

require ("../.private/cs.php");
$mysqli = new mysqli($mysql_host,$mysql_username,$mysql_password,"QueryTool");

if ($mysqli->connect_error) {
    echo json_encode(array("status"=>"error","message"=>"Error Resolving CPC class."));

    die("Error : (". $mysqli->connect_errno .") ". $mysqli->connect_error);
}

$pair = array();

if (isset($_GET["cc"]))
{
    if (strlen($_GET["cc"]) == 0) {
        if($statement = $mysqli->prepare("SELECT distinct(section_id) FROM cpc_lookup ORDER BY section_id")){
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($section_id);

            while ($statement->fetch()) {
                $pair[] =  $section_id;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else if (strlen($_GET["cc"]) == 1) {
        if($statement = $mysqli->prepare("SELECT distinct(subsection_id) FROM cpc_lookup where (section_id = ?) ORDER BY subsection_id")){
            $statement->bind_param('s', $_GET["cc"]);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($subsection_id);

            while ($statement->fetch()) {
                $pair[] =  $_GET["cc"].$subsection_id;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else if (strlen($_GET["cc"]) == 2)
    {
        if($statement = $mysqli->prepare("SELECT distinct(subsection_id) FROM cpc_lookup where (section_id = ?) and (subsection_id LIKE ?) ORDER BY subsection_id")){
            $param = substr($_GET["cc"],1,1)."%";
            $statement->bind_param('ss', substr($_GET["cc"],0,1),$param);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($subsection_id);

            while ($statement->fetch()) {
                $pair[] = $_GET["cc"].$subsection_id;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else if (strlen($_GET["cc"]) == 3)
    {
        if($statement = $mysqli->prepare("SELECT distinct(group_id) FROM cpc_lookup where (section_id = ?) and (subsection_id = ?) ORDER BY group_id")){
            $statement->bind_param('ss', substr($_GET["cc"],0,1), substr($_GET["cc"],1,2));
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($group_id);

            while ($statement->fetch()) {
                $pair[] =  $_GET["cc"].$group_id;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else if (strlen($_GET["cc"]) == 4)
    {
        if($statement = $mysqli->prepare("SELECT distinct(subgroup_id) FROM cpc_lookup where (section_id = ?) and (subsection_id = ?) and (group_id = ?) ORDER BY subgroup_id")){
            $statement->bind_param('sss', substr($_GET["cc"],0,1), substr($_GET["cc"],1,2), substr($_GET["cc"],3,1));
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($subgroup_id);

            while ($statement->fetch()) {
                $pair[] =  $_GET["cc"].$subgroup_id;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else if (strlen($_GET["cc"]) > 4)
    {
        if($statement = $mysqli->prepare("SELECT distinct(subgroup_id) FROM cpc_lookup where (section_id = ?) and (subsection_id = ?) and (group_id = ?) and (subgroup_id LIKE ?) ORDER BY subgroup_id")){
            $pos = strpos($_GET["cc"],"/");
            if ($pos) {
                $param = substr($_GET["cc"],4,$pos-4)."/".substr($_GET["cc"],$pos+1)."%";
            } else {
                $param = substr($_GET["cc"],4)."%";
            }
            $statement->bind_param('ssss', substr($_GET["cc"],0,1), substr($_GET["cc"],1,2), substr($_GET["cc"],3,1), $param);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($subgroup_id);

            while ($statement->fetch()) {
                $pair[] =  substr($_GET["cc"],0, 4).$subgroup_id;
            }

            $statement->free_result();
            $statement->close();
        }
    }
}

$mysqli->close();

echo json_encode($pair);

?>