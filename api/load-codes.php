<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include 'vendor/autoload.php';

$_POST = json_decode(file_get_contents("php://input"), true);
//print_r($_POST);
//$conn = new mysqli('localhost', 'framer', 'stefan91', 'framer');

//sleep(2);

if ($_GET['action'] === 'load-codes' || $_POST['action'] === 'load-codes') {

    $settings = array(
        'baseUri' => "http://cloud.frame-house.eu/remote.php/dav",
        'userName' => "factory",
        'password' => "stefan91",
    );
    $client = new Sabre\DAV\Client($settings);

    //$features = $client->options();
    //$response = $client->request('GET');

    $folder_content = $client->propFind('files/Codes', [], 1);
    $file_list['status'] = "success";

    //print_r($folder_content);

    foreach ($folder_content as $key => $value) {
        if ($key != '/remote.php/files/Codes/') {
            $file_name = end(explode('/', $key));
            $file = [];
            $file['name'] = urldecode($file_name);
            $file['url'] = "http://cloud.frame-house.eu/remote.php/files/Codes/{$file_name}";
            $file['type'] = $value['{DAV:}getcontenttype'];
            $file['modified'] = $value['{DAV:}getlastmodified'];
            $file['size'] = $value['{DAV:}getcontentlength'];
            $file['id'] = str_replace('"', '', $value['{DAV:}getetag']);
            $file_list['files'][] = $file;
        }
    }

    echo json_encode($file_list);

    //print_r($features);
    //print_r($response);

}

//$conn->close();

?>