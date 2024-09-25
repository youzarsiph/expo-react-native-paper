<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$_POST = json_decode(file_get_contents("php://input"), true);
//print_r($_POST);
$conn = new mysqli('localhost', 'framer', 'stefan91', 'framer');

//sleep(2);

if ($_GET['action'] === 'open-project' || $_POST['action'] === 'open-project') {

    $stmt = $conn->prepare("SELECT project_id, project_name FROM project_list WHERE project_id = '{$_POST['id']}' GROUP BY project_id");

    if ($stmt->execute()) {

        $result = $stmt->get_result();

        echo json_encode([
            "status" => "success",
            "project" => $result->fetch_assoc()
        ]);

    } else {

        echo json_encode([
            "status" => "error",
            "message" => "Something wrong... 🤷‍♂️"
        ]);
        
    }

    $stmt->close();

}

$conn->close();

?>