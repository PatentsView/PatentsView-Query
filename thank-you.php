<?php

require (".private/cs.php");
$mysqli = new mysqli($mysql_host,$mysql_username,$mysql_password,"QueryTool_dev");

if ($mysqli->connect_error) {
    echo json_encode(array("status"=>"error","message"=>"Error Fetching Query."));

    die("Error : (". $mysqli->connect_errno .") ". $mysqli->connect_error);
}

$sql = "SELECT entity_id, query_string FROM query_submission WHERE id=" . $_GET["q"];
$result = $mysqli->query($sql);

$entity_id = "";
$q = "";
$url = "";

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $entity_id = $row["entity_id"];
    $q = $row["query_string"];
    $url = "https://dev.patentsview.org/api/".$entity_id."s/query?".$q;
}

$result->close();
if (strtoupper(substr(php_uname('s'), 0, 3)) === 'WIN') {
    pclose(popen('start /B php.exe pv-qt-backend/index.php 2>nul >nul', "r"));
} else {
    pclose(popen('php pv-qt-backend/index.php 2>/dev/null >/dev/null &', "r"));
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Create a PatentsView Query</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Create a new Query">
    <meta name="author" content="AIR">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,400italic,600,700,800%7CRoboto+Slab:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="assets/css/headfoot.css" />
    <link rel="stylesheet" href="assets/css/font-awesome.min.css" />
    <link rel="stylesheet" href="assets/css/pvqt.css" />
</head>
<body>
    <noscript>
        This search tool requires Javascript. For more information about finding a particular patent or group of patents please visit
        <a href="http://uspto.gov/" title="United States Patent and Trademark Office Website">www.uspto.gov</a>or call our customer support at
        <a href="tel:1-800-786-9199" title="USPTO Customer Support Toll-Free Phone Number">1-800-786-9199</a>.
    </noscript>
    <div class="page-wrapper">
        
        <!-- Container -->
        <section id="step-by-step-container" class="container"></section>
        <!-- /Container -->
        <section class="container">
            <!-- form action buttons -->
            <div class="row">
                <div class="col-md-12">
                    <h2>Thank you</h2>
                    <p>
                        Your Query has been successfully submitted. Your results will be emailed to you shortly. If you do not receive an email with results within 24 hours please contact us at
                        <a href="mailto:contact@patentsview.org">cssip@air.org</a>.
                    </p>
                    <p style="margin-top: 10px; margin-bottom: 10px;">
                        <a href='<?php echo $url; ?>' target="_blank">
                            <?php echo $url; ?>
                        </a>
                    </p>
                    <a href="https://dev.patentsview.org/query" class="prev-next-btn btn btn-lg btn-primary" title="Begin New Query">
                        Begin New Query
                        <i class="fa fa-caret-right"></i>
                    </a>
                </div>
            </div>
    </div>
    <script src="js/header_footer.js"></script>
</body>
</html>
