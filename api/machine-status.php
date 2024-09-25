<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$_POST = json_decode(file_get_contents("php://input"), true);
//print_r($_POST);
$conn = new mysqli('localhost', 'framer', 'stefan91', 'framer');

//sleep(2);

if ($_GET['action'] === 'machine-status' || $_POST['action'] === 'machine-status') {

    if ($sc1 = file_get_contents('http://94.101.224.82:8082/log.php')) {
        $status['hundegger_sc1']['status'] = "Online";
    } else {
        $status['hundegger_sc1']['status'] = "Offline";
    }
    
    // K2 finished list parser
    if ($k2 = file_get_contents('http://94.101.224.82:8081/log.php')) {
        $status['hundegger_k2']['status'] = "Online";
    } else {
        $status['hundegger_k2']['status'] = "Offline";
    }

    echo json_encode($status);

}

$conn->close();

?>