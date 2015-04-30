</p>
<?php
if(isset($_POST['g-recaptcha-response'])){
echo verify($_POST['g-recaptcha-response']);

}

function verify($response) {
$ip = $_SERVER['REMOTE_ADDR']; //server Ip
$key="6LcUEgYTAAAAAGqEbmwIhc9Um8BX0x99oFrHixQg"; // Secret key

$url = 'https://www.google.com/recaptcha/api/siteverify';
$full_url = $url.'?secret='.$key.'&response='.$response.'&remoteip='.$ip;

$data = json_decode(file_get_contents($full_url));
if(isset($data->success) && $data->success == true) {
return True;
}
return False;
}
?>
<p style="text-align: justify;">