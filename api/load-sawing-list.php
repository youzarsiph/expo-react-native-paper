<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$_POST = json_decode(file_get_contents("php://input"), true);
$conn = new mysqli('localhost', 'framer', 'stefan91', 'framer');

//sleep(1);

if ($_GET['action'] === 'load-sawing-list' || $_POST['action'] === 'load-sawing-list') {

    $id = $_POST['id'];

    $stmt = $conn->prepare("SELECT * FROM project_levels WHERE project_id = ? GROUP BY level_id");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {

        $result_levels = $stmt->get_result();
        $result_levels = $result_levels->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        foreach ($result_levels as $level_key => $level_value) {

            $result_levels[$level_key]['level_name'] = preg_replace('/[^A-Za-z0-9\-]/', ' ', $result_levels[$level_key]['level_name']);

            $stmt = $conn->prepare("SELECT * FROM project_groups WHERE level_id = ? GROUP BY group_id");
            $stmt->bind_param("i", $level_value['level_id']);

            if ($stmt->execute()) {

                $result_groups = $stmt->get_result();
                $result_groups = $result_groups->fetch_all(MYSQLI_ASSOC);
                $stmt->close();
                $result_levels[$level_key]['level_groups'] = $result_groups;

                foreach ($result_groups as $group_key => $group_value) {

                    $stmt = $conn->prepare("SELECT * FROM project_parts WHERE group_id = ? GROUP BY part_id");
                    $stmt->bind_param("i", $group_value['group_id']);

                    if ($stmt->execute()) {

                        $result_parts = $stmt->get_result();
                        $result_parts = $result_parts->fetch_all(MYSQLI_ASSOC);
                        $stmt->close();
                        $result_levels[$level_key]['level_groups'][$group_key]['group_parts'] = $result_parts;

                    }

                }

            }

        }

        echo json_encode([
            "status" => "success",
            "levels" => $result_levels,
        ]);

    } else {

        echo json_encode([
            "status" => "error",
            "message" => "Something wrong... 🤷‍♂️",
        ]);

    }

}

$conn->close();
