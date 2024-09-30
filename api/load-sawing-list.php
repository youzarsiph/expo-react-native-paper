<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$_POST = json_decode(file_get_contents("php://input"), true);
$conn = new mysqli('localhost', 'framer', 'stefan91', 'framer');

sleep(1);

if ($_GET['action'] === 'load-sawing-list' || $_POST['action'] === 'load-sawing-list') {

    $stmt = $conn->prepare("SELECT * FROM project_levels WHERE project_id = ? GROUP BY level_id");
    $stmt->bind_param("i", $_POST['id']);

    if ($stmt->execute()) {

        $result = $stmt->get_result();

        echo json_encode([
            "status" => "success",
            "levels" => $result->fetch_all(MYSQLI_ASSOC)
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