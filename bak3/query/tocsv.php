<?php
$code = 'C:/querytool/JSONtoCSV_jp.py';
$data = escapeshellarg(json_encode($_POST["query"]));
$code = escapeshellarg($code) . ' ' . ($data);
$result = shell_exec('python '.$code);
echo $result;
?>