<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$_POST = json_decode(file_get_contents("php://input"), true);
//print_r($_POST);
$conn = new mysqli('localhost', 'framer', 'stefan91', 'framer');

//sleep(5);

if ($_GET['action'] === 'select-projects' || $_POST['action'] === 'select-projects') {

    $stmt = $conn->prepare("SELECT project_id, project_name FROM project_list GROUP BY project_id");

    if ($stmt->execute()) {

        $result = $stmt->get_result();

        echo json_encode([
            "status" => "success",
            "projects" => $result->fetch_all(MYSQLI_ASSOC)
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