<pre><?php

/* sync-sawing-scheadule.php v1

Script for synchronization data between managers
Excel (dBase) sawing scheadule and MySQL DB.

Changes: 03/10/2024 */

date_default_timezone_set('Europe/Riga');

if (isset($_GET['sync'])) {

    echo file_get_contents('assets/upload-form.html');

    if (isset($_POST["submit"]) && $_FILES['file']['type'] == 'application/octet-stream') {

        //print_r($_POST);
        print_r($_FILES);

        $db_file = $_FILES['file']['tmp_name'];
        if ($db = dbase_open($db_file, DBASE_RDONLY)) {

            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
            $mysqli = new mysqli('localhost', 'framer', 'stefan91', 'framer');

            $record_numbers = dbase_numrecords($db);
            echo "Rows: {$record_numbers}\n"; // Rows number in db file.

            // 0 - production start date
            // 1 - production end date
            // 3 - project name
            // 5 - deal status
            // 6 - production status

            for ($i = 1; $i <= $record_numbers; $i++) {

                $row = dbase_get_record($db, $i);
                print_r($row);

                $query = 'SELECT project_name FROM project_list WHERE project_name=? LIMIT 1';
                $result = $mysqli->execute_query($query, [trim($row[3])]);
                $project_exist = (bool) $result->fetch_assoc();

                if ($project_exist) {

                    echo "Project exists, update\n";

                    $update = 'UPDATE project_list SET
                        project_production_start_date=?,
                        project_production_end_date=?,
                        project_status=?';
                    $mysqli->execute_query($update, [
                        date_timestamp_get(date_create_from_format("Ymd", $row[0])),
                        date_timestamp_get(date_create_from_format("Ymd", $row[1])),
                        trim($row[6])
                    ]);

                } else {

                    echo "Project doesn't exists, insert\n";

                    $insert = 'INSERT INTO project_list (
                        project_name,
                        project_production_start_date,
                        project_production_end_date,
                        project_status
                        ) VALUES (?, ?, ?, ?)';
                    $mysqli->execute_query($insert, [
                        trim($row[3]),
                        date_timestamp_get(date_create_from_format("Ymd", $row[0])),
                        date_timestamp_get(date_create_from_format("Ymd", $row[1])),
                        trim($row[6])
                    ]);

                }

            }

            dbase_close($db);

        } else {

            echo 'error';

        }

    }

}

?>