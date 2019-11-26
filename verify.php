<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

function verify($response) {
    require (".private/key.php");
    $ip = $_SERVER["REMOTE_ADDR"]; //server Ip
    $url = "https://www.google.com/recaptcha/api/siteverify";
    $full_url = $url."?secret=".$key."&response=".$response."&remoteip=".$ip;
    $data = json_decode(file_get_contents($full_url));
    if(isset($data->success) && $data->success == true) {
        return true;
    }
    return false;
}

function save($json) {
    require (".private/cs.php");
    $ip = $_SERVER["REMOTE_ADDR"]; //server Ip
    $data = json_decode($json);
    $recipient = $data->recipient;
    $entity_id = $data->entityId;
    $group_id = $data->groupId;
    $field_id = $data->fieldId;
    $result_count = $data->resultCount;
    $format_json = $data->json;
    $format_xml = $data->xml;
    $format_csv = $data->csv;
    $output_fields = join(",", $data->outputIds);
    $query_string = $data->query;

    $mysqli = new mysqli($mysql_host,$mysql_username,$mysql_password,$mysql_database);

    if ($mysqli->connect_error) {
        echo json_encode(array("status"=>"error","message"=>"Error Processing Query."));

        die("Error : (". $mysqli->connect_errno .") ". $mysqli->connect_error);
    }

    $insert_sql = "INSERT INTO query_submission (recipient, entity_id, group_id, field_id, result_count, format_json, format_xml, format_csv, output_fields, query_string, date_created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
    $statement = $mysqli->prepare($insert_sql);

    //bind parameters for markers, where (s = string, i = integer, d = double,  b = blob)

    $statement->bind_param("ssssiiiiss", $recipient, $entity_id, $group_id, $field_id, $result_count, $format_json, $format_xml, $format_csv, $output_fields, $query_string);

    if($statement->execute()){
        $q_id = $statement->insert_id;
        $statement->close();
        echo json_encode(array("status"=>"success","message"=>"Query Submitted.", "id"=>$q_id));
    }else{
        echo json_encode(array("status"=>"error","message"=>"Error Processing Query."));

        die("Error : (". $mysqli->errno .") ". $mysqli->error);
    }
}

if(isset($_POST["g-recaptcha-response"]) && isset($_POST["query"])){
    if (verify($_POST["g-recaptcha-response"]))
    {
        save($_POST["query"]);
    }
}
else{
    echo json_encode(array("status"=>"error","message"=>"Recaptcha Failed."));
}
?>








