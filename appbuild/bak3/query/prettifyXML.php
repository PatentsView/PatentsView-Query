<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/xml');

$simpleXml = <<<XML
<?xml version="1.0"?><root><patents><patent><patent_title>Signal amplification circuits for receiving/transmitting signals according to input signal</patent_title></patent>
</patents>
<count>1</count>
<total_patent_count>1</total_patent_count>
</root>
XML;
$simpleXml = new SimpleXMLElement($simpleXml);
//$simpleXml = new SimpleXMLElement($_GET["cc"]);
$dom = new DOMDocument("1.0");
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;
$dom->loadXML($simpleXml->asXML());
echo $dom->saveXML();

?>