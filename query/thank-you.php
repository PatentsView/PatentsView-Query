<?php

require ("../.private/cs.php");
$mysqli = new mysqli($mysql_host,$mysql_username,$mysql_password,"QueryTool");

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
    $url = "http://www.patentsview.org/api/".$entity_id."s/query?".$q;
}

$result->close();
pclose(popen('start /B php.exe C:/querytool/backend.php '.$id.' 2>nul >nul', "r"));

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Create a PatentsView Query</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Create a new Query">
    <meta name="author" content="AIR">
    <link href='//fonts.googleapis.com/css?family=Open+Sans:300,400,400italic,600,700,800%7CRoboto+Slab:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="../assets/css/headfoot.css" />
    <link rel="stylesheet" href="../assets/css/font-awesome.min.css" />
    <link rel="stylesheet" href="../assets/css/pvqt.css" />
</head>
<body>
    <noscript>
        This search tool requires Javascript. For more information about finding a particular patent or group of patents please visit
        <a href="http://uspto.gov/" title="United States Patent and Trademark Office Website">www.uspto.gov</a>or call our customer support at
        <a href="tel:1-800-786-9199" title="USPTO Customer Support Toll-Free Phone Number">1-800-786-9199</a>.
    </noscript>
    <div class="page-wrapper">
        <header class="med-header">
            <div>
                <h1>
                    <a href="/" title="PatentsView - USPTO">
                        <img alt="PatentsView Logo" src="../assets/img/logo_2x.png" style="width: 221px; margin-top: 6px;" />
                    </a>
                </h1>
                <nav>
                    <ul>
                        <li class="api">
                            <a href="http://www.patentsview.org/api/doc.html">
                                <img class="logo-img" alt="API" src="../assets/img/shared/api.png" />API
                            </a>
                        </li>
                        <li class="data-query active">
                            <a href="http://www.patentsview.org/query/">
                                <img class="logo-img" alt="API" src="../assets/img/shared/data-query.png" />Data Query
                            </a>
                        </li>
                        <li class="data-download">
                            <a href="http://www.patentsview.org/download/">
                                <img class="logo-img" alt="API" src="../assets/img/shared/data-download.png" />Data Download
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
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
                        <a href="mailto:cssip@air.org">cssip@air.org</a>.
                    </p>
                    <p style="margin-top: 10px; margin-bottom: 10px;">
                        <a href='<?php echo $url; ?>' target="_blank">
                            <?php echo $url; ?>
                        </a>
                    </p>
                    <a href="http://www.patentsview.org/querydev" class="prev-next-btn btn btn-lg btn-primary" title="Begin New Query">
                        Begin New Query
                        <i class="fa fa-caret-right"></i>
                    </a>
                </div>
            </div>
    </div>
    <footer class="fat-footer primary-footer">
        <div class="center-shell">
            <div class="column one">
                <div class="new-info">
                    <h4>PatentsView Info</h4>
                    <ul>
                        <li class="relationships">
                            <a href="#viz/relationships" title="Relationships">Relationships</a>
                        </li>
                        <li class="locations-link">
                            <a href="#viz/locations" title="Locations">Locations</a>
                        </li>
                        <li class="comparisons">
                            <a href="#viz/comparisons" title="Comparisons">Comparisons</a>
                        </li>
                        <li class="list-search">
                            <a href="#search&amp;simp=1" title="List Search">List Search</a>
                        </li>
                        <li class="about">
                            <a href="#" title="About">About</a>
                        </li>
                        <li class="methods">
                            <a href="#" title="Methods and Sources">Methods and Sources</a>
                        </li>
                        <li class="glossary">
                            <a href="/api/glossary.html" title="Glossary" style="text-decoration: underline;">Glossary</a>
                        </li>
                        <li class="feedback">
                            <a href="mailto:cssip@air.org" title="Send Feedback">Send Feedback</a>
                        </li>
                    </ul>
                </div>
                <div class="copyright">
                    <!-- react-text: 127 -->© Copyright<!-- /react-text --><!-- react-text: 128 --><!-- /react-text --><!-- react-text: 129 -->2017<!-- /react-text -->
                </div>
            </div>
            <div class="column two">
                <div class="new-data-sources">
                    <h4>Data Sources</h4>
                    <ul>
                        <li>
                            <a href="/api">Api</a>
                        </li>
                        <li>
                            <a href="/query">Data Query</a>
                        </li>
                        <li>
                            <a href="/download">Data Download</a>
                        </li>
                        <li>
                            <a href="http://www.patentsview.org/community">Community</a>
                        </li>
                    </ul>
                    <div class="update-date">
                        <!-- react-text: 143 -->Data as of <!-- /react-text --><!-- react-text: 144 -->August 08, 2017<!-- /react-text -->
                    </div>
                </div>
            </div>
            <div class="column three">
                <div class="new-credit">
                    <h4>This Initiative</h4>
                    <p>This platform uses data derived from the US Patent and Trademark Office (USPTO) bulk data files. These data are provided for research purposes and do not constitute the official USPTO record.</p>
                    <p>
                        <!-- react-text: 150 -->Supported by the<!-- /react-text --><!-- react-text: 151 --><!-- /react-text -->
                        <a href="http://www.uspto.gov/economics/" target="_blank">USPTO Office of the Chief Economist</a><!-- react-text: 153 -->, with additional support from the<!-- /react-text --><!-- react-text: 154 --><!-- /react-text -->
                        <a href="http://www.usda.gov" target="_blank">US Department of Agriculture</a><!-- react-text: 156 --><!-- /react-text --><!-- react-text: 157 -->(USDA).<!-- /react-text -->
                    </p>
                </div>
                <div class="logo-link">
                    <a href="http://www.uspto.gov/" target="_blank">
                        <img class="logo-img" alt="sponsored by the USPTO" src="../assets/img/landing/uspto.png" />
                    </a>
                </div>
            </div>
            <div class="column four">
                <div class="terms-and-services">
                    <h4>Terms &amp; Services</h4>
                    <p>
                        <!-- react-text: 165 -->Users are free to use, share, or adapt the material for any purpose, subject to the standards of the<!-- /react-text --><!-- react-text: 166 --><!-- /react-text -->
                        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0 International License</a><!-- react-text: 168 -->.<!-- /react-text -->
                    </p>
                    <p>
                        <!-- react-text: 170 -->Attribution should be given to<!-- /react-text --><!-- react-text: 171 --><!-- /react-text -->
                        <a href="http://www.patentsview.org/">PatentsView</a><!-- react-text: 173 --><!-- /react-text --><!-- react-text: 174 -->for use, distribution, or derivative works.<!-- /react-text -->
                    </p>
                </div>
                <div class="logo-link">
                    <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">
                        <img class="logo-img" alt="Creative Commons License" src="../assets/img/landing/creative-commons.png" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
