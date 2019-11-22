<?php
$your_json=json_encode($_POST["query"]);
$filename = "C:/querytool/preview/".hash("crc32", $your_json).".json";
file_put_contents ($filename, $your_json);
$code = 'C:/querytool/JSONtoCSV_jp.py';
$code = escapeshellarg($code . ' ' . $filename);
$result = shell_exec('python '.str_replace('"','',$code));
shell_exec('del '.$filename);
shell_exec('del '.str_replace("json","csv",$filename));
echo $result;
?>
