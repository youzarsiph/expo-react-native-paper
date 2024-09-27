<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

function zipFileErrMsg($errno)
{
    // using constant name as a string to make this function PHP4 compatible
    $zipFileFunctionsErrors = array(
        'ZIPARCHIVE::ER_MULTIDISK' => 'Multi-disk zip archives not supported.',
        'ZIPARCHIVE::ER_RENAME' => 'Renaming temporary file failed.',
        'ZIPARCHIVE::ER_CLOSE' => 'Closing zip archive failed',
        'ZIPARCHIVE::ER_SEEK' => 'Seek error',
        'ZIPARCHIVE::ER_READ' => 'Read error',
        'ZIPARCHIVE::ER_WRITE' => 'Write error',
        'ZIPARCHIVE::ER_CRC' => 'CRC error',
        'ZIPARCHIVE::ER_ZIPCLOSED' => 'Containing zip archive was closed',
        'ZIPARCHIVE::ER_NOENT' => 'No such file.',
        'ZIPARCHIVE::ER_EXISTS' => 'File already exists',
        'ZIPARCHIVE::ER_OPEN' => 'Can\'t open file',
        'ZIPARCHIVE::ER_TMPOPEN' => 'Failure to create temporary file.',
        'ZIPARCHIVE::ER_ZLIB' => 'Zlib error',
        'ZIPARCHIVE::ER_MEMORY' => 'Memory allocation failure',
        'ZIPARCHIVE::ER_CHANGED' => 'Entry has been changed',
        'ZIPARCHIVE::ER_COMPNOTSUPP' => 'Compression method not supported.',
        'ZIPARCHIVE::ER_EOF' => 'Premature EOF',
        'ZIPARCHIVE::ER_INVAL' => 'Invalid argument',
        'ZIPARCHIVE::ER_NOZIP' => 'Not a zip archive',
        'ZIPARCHIVE::ER_INTERNAL' => 'Internal error',
        'ZIPARCHIVE::ER_INCONS' => 'Zip archive inconsistent',
        'ZIPARCHIVE::ER_REMOVE' => 'Can\'t remove file',
        'ZIPARCHIVE::ER_DELETED' => 'Entry has been deleted',
    );
    $errmsg = 'unknown';
    foreach ($zipFileFunctionsErrors as $constName => $errorMessage) {
        if (defined($constName) and constant($constName) === $errno) {
            return 'Zip File Function error: ' . $errorMessage;
        }
    }
    return 'Zip File Function error: unknown';
}

$_POST = json_decode(file_get_contents("php://input"), true);
//print_r($_POST);
$conn = new mysqli('localhost', 'framer', 'stefan91', 'framer');

//sleep(1);

//$test = file_get_contents('http://factory:stefan91@cloud.frame-house.eu/remote.php/files/Codes/Michael%20Levy.zip');
//$url = 'http://factory:stefan91@cloud.frame-house.eu/remote.php/files/Codes/Michael%20Levy.zip';

if ($_GET['action'] == 'import-codes' || $_POST['action'] == 'import-codes') {

    $pid = $_POST['pid'];
    $file = $_POST['file'];
    $url = str_replace('http://', 'http://factory:stefan91@', $file);

    if (file_put_contents('tmp/tmp.zip', file_get_contents($url))) {

        $result['status'] = 'success';
        $result['log'][] = "File ({$file}) successfuly downloaded";

        $za = new ZipArchive;

        $zip = $za->open('tmp/tmp.zip');

        if ($zip) {
            $result['log'][] = 'Zip archive successfuly opened';

            // Extract files tree from ZIP archive
            $Tree = $pathArray = array(); //empty arrays

            for ($i = 0; $i < $za->numFiles; $i++) {
                $path = $za->getNameIndex($i);
                $pathBySlash = array_values(explode('/', $path));
                $c = count($pathBySlash);
                $temp = &$Tree;
                for ($j = 0; $j < $c - 1; $j++) {
                    if (isset($temp[$pathBySlash[$j]])) {
                        $temp = &$temp[$pathBySlash[$j]];
                    } else {
                        $temp[$pathBySlash[$j]] = array();
                        $temp = &$temp[$pathBySlash[$j]];
                    }
                    if (substr($path, -1) != '/') {
                        $temp[] = $pathBySlash[$c - 1];
                    }
                }
            }

            // Parse BVN files from ZIP archive
            $order = 0;
            foreach ($Tree as $dir => $files) {
                if ($dir) {
                    // Insert project level to DB
                    $stmt = $conn->prepare("INSERT INTO project_levels (project_id, level_name, level_order, level_from_file) VALUES (?, ?, ?, ?)");
                    $stmt->bind_param("isis", $pid, $dir, $order, $file);
                    $stmt->execute();
                    $stmt->close();
                    // Select last inserted row id
                    $current_level_id = $conn->query("SELECT MAX(level_id) AS current_level_id FROM project_levels")->fetch_assoc();
                    $current_level_id = $current_level_id['current_level_id'];
                    $result['log'][] = "Current level_id: {$current_level_id}";
                    $order++;
                }
                $t = 0;/*
                foreach ($files as $file) {
                    $file_ext = strtolower(end(explode('.', $file)));
                    if ($file_ext == 'bvn') {
                        $source = explode("\n", $za->getFromName($dir . '/' . $file));
                        $source = array_slice($source, 1, -1);

                        $tmp = array();
                        $i = 0;
                        foreach ($source as $row) {
                            $row = preg_replace("/\s+/", " ", trim($row));
                            $row = explode(' ', $row);
                            if ($t == 0) {
                                $project_tag = explode('/', $row[1])[0];
                                $db->query("update `projects` set tag = '{$project_tag}' where pID = '{$project_id}'");
                                $t++;
                            }
                            $cursor = (int) substr($row[0], -3);
                            if (!$tmp[$cursor]) {
                                if (substr($row[1], -1) != '/') {
                                    $tag = $row[1] . '/' . $cursor;
                                } else {
                                    $tag = $row[1] . $cursor;
                                }
                                $tmp[$cursor]['tag'] = str_replace(array('\'', '"'), '', $tag);
                                $i++;
                            } elseif ($i == 1) {
                                $tmp[$cursor]['quantity'] = $row[1];
                                $tmp[$cursor]['height'] = $row[3];
                                $tmp[$cursor]['width'] = $row[4];
                                $tmp[$cursor]['length'] = $row[5];
// Insert part to DB
                                $db->query("insert into `projects_parts` (pID, gID, name, height, width, length, quantity) values ('{$project_id}', '{$group_id}', '{$tmp[$cursor]['tag']}', '{$tmp[$cursor]['height']}', '{$tmp[$cursor]['width']}', '{$tmp[$cursor]['length']}', '{$tmp[$cursor]['quantity']}')");
                                $i = 0;
                            }
                        }
                    }
                }*/
            }

            $result['status'] = 'success';
            $result['project_id'] = $pid;
            $result['file'] = $file;
            $result['archive'] = $Tree;

        } else {
            $result['log'][] = zipFileErrMsg($zip);
        }

        $za->close();

    } else {
        $result['status'] = 'error';
        $result['message'] = 'File downloading failed';
    }

}

echo json_encode($result);

$conn->close();
