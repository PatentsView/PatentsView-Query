<?php
if(isset($_POST['g-recaptcha-response']) && isset($_POST['query'])){
    submit($_POST['g-recaptcha-response'], $_POST['query']);
}
function verify($response, $query) {
    $ip = $_SERVER['REMOTE_ADDR']; //server Ip
    $key="6LcUEgYTAAAAAGqEbmwIhc9Um8BX0x99oFrHixQg"; // Secret key

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $full_url = $url.'?secret='.$key.'&response='.$response.'&remoteip='.$ip;

    $data = json_decode(file_get_contents($full_url));
    if(isset($data->success) && $data->success == true) {
        
        //recaptcha is verified safe to save query.
        //Clean the query string for xss and inject script behaviors.
        
        //TODO: Save the query.
        
        return True;
    }
    return False;
}
?>
