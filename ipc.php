<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

require ("../.private/cs.php");
$mysqli = new mysqli($mysql_host,$mysql_username,$mysql_password,$mysql_database);

if ($mysqli->connect_error) {
    echo json_encode(array("status"=>"error","message"=>"Error Resolving CPC class."));

    die("Error : (". $mysqli->connect_errno .") ". $mysqli->connect_error);
}

$pair = array();

if (isset($_GET["cc"]))
{
    if (strlen($_GET["cc"]) == 0) {
        if($statement = $mysqli->prepare("SELECT distinct(section) FROM ipc_lookup ORDER BY section")){
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($section);

            while ($statement->fetch()) {
                $pair[] =  $section;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else if (strlen($_GET["cc"]) == 1) {
        if($statement = $mysqli->prepare("SELECT distinct(ipc_class) FROM ipc_lookup where (section = ?) ORDER BY ipc_class")){
            $statement->bind_param('s', $_GET["cc"]);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($ipc_class);

            while ($statement->fetch()) {
                $pair[] =  $_GET["cc"].$ipc_class;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else if (strlen($_GET["cc"]) == 2)
    {
        if($statement = $mysqli->prepare("SELECT distinct(ipc_class) FROM ipc_lookup where (section = ?) and (ipc_class LIKE ?) ORDER BY ipc_class")){
            $param = substr($_GET["cc"],1,1)."%";
            $statement->bind_param('ss', substr($_GET["cc"],0,1),$param);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($ipc_class);

            while ($statement->fetch()) {
                $pair[] = $_GET["cc"].$ipc_class;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else if (strlen($_GET["cc"]) == 3)
    {
        if($statement = $mysqli->prepare("SELECT distinct(subclass) FROM ipc_lookup where (section = ?) and (ipc_class = ?) ORDER BY subclass")){
            $statement->bind_param('ss', substr($_GET["cc"],0,1), substr($_GET["cc"],1,2));
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($subclass);

            while ($statement->fetch()) {
                $pair[] =  $_GET["cc"].$subclass;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else if (strlen($_GET["cc"]) == 4)
    {
        if($statement = $mysqli->prepare("SELECT distinct(main_group) FROM ipc_lookup where (section = ?) and (ipc_class = ?) and (subclass = ?) ORDER BY main_group")){
            $statement->bind_param('sss', substr($_GET["cc"],0,1), substr($_GET["cc"],1,2), substr($_GET["cc"],3,1));
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($main_group);

            while ($statement->fetch()) {
                $pair[] =  $_GET["cc"].$main_group;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else if (strlen($_GET["cc"]) > 4 && !strpos($_GET["cc"],"/"))
    {
        if($statement = $mysqli->prepare("SELECT distinct(main_group) FROM ipc_lookup where (section = ?) and (ipc_class = ?) and (subclass = ?) and (main_group LIKE ?) ORDER BY main_group")){
            $param = substr($_GET["cc"],4)."%";
            $statement->bind_param('ssss', substr($_GET["cc"],0,1), substr($_GET["cc"],1,2), substr($_GET["cc"],3,1), $param);
            $statement->execute();
            $statement->store_result();
            $statement->bind_result($main_group);

            while ($statement->fetch()) {
                $pair[] =  substr($_GET["cc"],0, 4).$main_group;
            }

            $statement->free_result();
            $statement->close();
        }
    }
    else if (strlen($_GET["cc"]) > 4 && strpos($_GET["cc"],"/"))
    {
        $pos = strpos($_GET["cc"],"/");
        if (strlen($_GET["cc"]) <= $pos+1) //just a / return all subgroups for main_group
        {
            if($statement = $mysqli->prepare("SELECT distinct(subgroup) FROM ipc_lookup where (section = ?) and (ipc_class = ?) and (subclass = ?) and (main_group = ?) ORDER BY subgroup")){
                $statement->bind_param('ssss', substr($_GET["cc"],0,1), substr($_GET["cc"],1,2), substr($_GET["cc"],3,1), substr($_GET["cc"],4,strlen($_GET["cc"])-$pos+1));
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
        else
        {
            if($statement = $mysqli->prepare("SELECT distinct(subgroup) FROM ipc_lookup where (section = ?) and (ipc_class = ?) and (subclass = ?) and (main_group = ?) and (subgroup LIKE ?) ORDER BY subgroup")){
                $param = substr($_GET["cc"],$pos+1)."%";
                $statement->bind_param('sssss', substr($_GET["cc"],0,1), substr($_GET["cc"],1,2), substr($_GET["cc"],3,1), substr($_GET["cc"],4,strlen($_GET["cc"])-$pos), $param);
                $statement->execute();
                $statement->store_result();
                $statement->bind_result($subgroup_id);

                while ($statement->fetch()) {
                    $pair[] = substr($_GET["cc"],0,1).substr($_GET["cc"],1,2).substr($_GET["cc"],3,1).substr($_GET["cc"],4,strlen($_GET["cc"])-$pos)."/".$subgroup_id;
                }

                $statement->free_result();
                $statement->close();
            }
        }
    }
}

$mysqli->close();

echo json_encode($pair);

?>