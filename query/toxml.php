<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/xml');

$simpleXml = new SimpleXMLElement($_POST["query"]);
$dom = new DOMDocument("1.0");
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;
$dom->loadXML($simpleXml->asXML());
echo $dom->saveXML();
?>
