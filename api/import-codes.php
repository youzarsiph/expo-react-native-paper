<?php

// Заголовки для разрешения CORS и работы с методами PUT, GET, POST
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Функция для возврата сообщений об ошибках ZipArchive
function zipFileErrMsg($errno)
{
    // Используем названия констант как строки для совместимости с PHP4
    $zipFileFunctionsErrors = array(
        'ZIPARCHIVE::ER_MULTIDISK' => 'Multi-disk zip archives not supported.',
        'ZIPARCHIVE::ER_RENAME' => 'Renaming temporary file failed.',
        'ZIPARCHIVE::ER_CLOSE' => 'Closing zip archive failed.',
        'ZIPARCHIVE::ER_SEEK' => 'Seek error.',
        'ZIPARCHIVE::ER_READ' => 'Read error.',
        'ZIPARCHIVE::ER_WRITE' => 'Write error.',
        'ZIPARCHIVE::ER_CRC' => 'CRC error.',
        'ZIPARCHIVE::ER_ZIPCLOSED' => 'Containing zip archive was closed.',
        'ZIPARCHIVE::ER_NOENT' => 'No such file.',
        'ZIPARCHIVE::ER_EXISTS' => 'File already exists.',
        'ZIPARCHIVE::ER_OPEN' => 'Can\'t open file.',
        'ZIPARCHIVE::ER_TMPOPEN' => 'Failure to create temporary file.',
        'ZIPARCHIVE::ER_ZLIB' => 'Zlib error.',
        'ZIPARCHIVE::ER_MEMORY' => 'Memory allocation failure.',
        'ZIPARCHIVE::ER_CHANGED' => 'Entry has been changed.',
        'ZIPARCHIVE::ER_COMPNOTSUPP' => 'Compression method not supported.',
        'ZIPARCHIVE::ER_EOF' => 'Premature EOF.',
        'ZIPARCHIVE::ER_INVAL' => 'Invalid argument.',
        'ZIPARCHIVE::ER_NOZIP' => 'Not a zip archive.',
        'ZIPARCHIVE::ER_INTERNAL' => 'Internal error.',
        'ZIPARCHIVE::ER_INCONS' => 'Zip archive inconsistent.',
        'ZIPARCHIVE::ER_REMOVE' => 'Can\'t remove file.',
        'ZIPARCHIVE::ER_DELETED' => 'Entry has been deleted.',
    );

    // Поиск соответствующего сообщения об ошибке
    foreach ($zipFileFunctionsErrors as $constName => $errorMessage) {
        if (defined($constName) && constant($constName) === $errno) {
            return 'Zip File Function error: ' . $errorMessage;
        }
    }
    return 'Zip File Function error: unknown';
}

// Получаем данные из входного JSON и декодируем в массив
$_POST = json_decode(file_get_contents("php://input"), true);

// Подключаемся к базе данных (проверьте, что учетные данные корректные)
$conn = new mysqli('localhost', 'framer', 'stefan91', 'framer');

// Проверка успешности подключения к базе данных
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Проверка наличия действия в GET или POST запросах
if (isset($_GET['action']) && $_GET['action'] == 'import-codes' || isset($_POST['action']) && $_POST['action'] == 'import-codes') {

    // Защищаем полученные переменные
    $pid = filter_var($_POST['pid'], FILTER_SANITIZE_NUMBER_INT);
    $file = filter_var($_POST['file'], FILTER_SANITIZE_URL);

    $codes_exists = 'SELECT * FROM project_list WHERE project_id = ? LIMIT 1';
    $codes_exists = $conn->execute_query($codes_exists, [$pid]);
    $codes_exists = $codes_exists->fetch_assoc();

    if (empty($codes_exists['project_codes_import_date'])) {

        // Модифицируем URL для авторизации
        $url = str_replace('http://', 'http://factory:stefan91@', $file);

        // Попытка загрузки файла
        if (file_put_contents('tmp/tmp.zip', file_get_contents($url))) {
            $result['log'][] = "File ({$file}) successfully downloaded";

            $file_hash = hash_file('md5', 'tmp/tmp.zip');

            $za = new ZipArchive;
            $zip = $za->open('tmp/tmp.zip');

            // Проверяем успешное открытие ZIP файла
            if ($zip === true) {
                $result['log'][] = 'Zip archive successfully opened';

                // Создание директории для хранения кодов проекта
                $code_storage = "codes/{$pid}/";
                if (!is_dir($code_storage) && mkdir($code_storage, 0777)) {
                    $result['log'][] = "Folder {$code_storage} successfully created";
                } else {
                    $result['log'][] = "Can't create or folder {$code_storage} already exists";
                }

                // Извлечение файловой структуры из архива
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

                // Парсинг файлов BVN из архива
                $order = 0;
                foreach ($Tree as $dir => $files) {
                    if ($dir) {
                        // Подготовленный запрос для вставки уровня проекта в базу данных
                        $stmt = $conn->prepare("INSERT INTO project_levels (project_id, level_name, level_order, level_from_file) VALUES (?, ?, ?, ?)");
                        $stmt->bind_param("isis", $pid, $dir, $order, $file);
                        $stmt->execute();
                        $stmt->close();

                        // Получаем последний вставленный уровень проекта
                        $current_level_id = $conn->query("SELECT MAX(level_id) AS current_level_id FROM project_levels")->fetch_assoc();
                        $current_level_id = $current_level_id['current_level_id'];

                        $result['log'][] = "Current level_id: {$current_level_id}";

                        // Создание директории для уровня проекта
                        $group_storage = "codes/{$pid}/{$current_level_id}/";
                        if (!is_dir($group_storage) && mkdir($group_storage, 0777)) {
                            $result['log'][] = "Folder {$group_storage} successfully created";
                        } else {
                            $result['log'][] = "Can't create or folder {$group_storage} already exists";
                        }

                        $order++;
                    }

                    $t = 0;
                    $group_order = 0;
                    foreach ($files as $ex_file) {
                        $file_ext = strtolower(pathinfo($ex_file, PATHINFO_EXTENSION));

                        // Если это файл с расширением BVN
                        if ($file_ext == 'bvn') {
                            // Извлекаем содержимое файла
                            $source = $za->getFromName($dir . '/' . $ex_file);

                            // Записываем содержимое в файл
                            $code_file = "codes/{$pid}/{$current_level_id}/{$ex_file}";
                            if (file_put_contents($code_file, $source)) {
                                $result['log'][] = "File {$code_file} successfully created";
                            } else {
                                $result['log'][] = "Can't create file {$code_file}";
                            }

                            // Вставляем группу проекта в базу данных
                            $stmt = $conn->prepare(
                                "INSERT INTO project_groups (level_id, project_id, group_name, group_order, group_from_file, group_file)
                            VALUES (?, ?, ?, ?, ?, ?)"
                            );
                            $stmt->bind_param("iisiss", $current_level_id, $pid, $ex_file, $group_order, $file, $code_file);
                            $stmt->execute();
                            $stmt->close();

                            $group_order++;

                            // Получаем последний вставленный идентификатор группы
                            $current_group_id = $conn->query("SELECT MAX(group_id) AS current_group_id FROM project_groups")->fetch_assoc();
                            $current_group_id = $current_group_id['current_group_id'];

                            $result['log'][] = "Current group_id: {$current_group_id}";

                            // Обрабатываем содержимое BVN файла
                            $source = explode("\n", $source);
                            $source = array_slice($source, 1, -1);

                            $tmp = [];
                            $i = 0;

                            foreach ($source as $row) {
                                $row = preg_replace("/\s+/", " ", trim($row));
                                $row = explode(' ', $row);

                                // Определяем инициалы проекта
                                if ($t == 0) {
                                    $project_initials = explode('/', $row[1])[0];
                                    $stmt = $conn->prepare("UPDATE project_list SET
                                        project_initials = ?,
                                        project_codes_url = ?,
                                        project_codes_hash = ?,
                                        project_codes_import_date = ?
                                        WHERE project_id = ?");
                                    $stmt->bind_param("sssii", $project_initials, $file, $file_hash, time(), $pid);
                                    $stmt->execute();
                                    $stmt->close();
                                    $t++;
                                }

                                // Собираем информацию о частях проекта
                                $cursor = (int) substr($row[0], -3);
                                if (!isset($tmp[$cursor])) {
                                    $tag = (substr($row[1], -1) != '/') ? $row[1] . '/' . $cursor : $row[1] . $cursor;
                                    $tmp[$cursor]['tag'] = str_replace(['\'', '"'], '', $tag);
                                    $i++;
                                } elseif ($i == 1) {
                                    $tmp[$cursor]['quantity'] = $row[1];
                                    $tmp[$cursor]['height'] = $row[3];
                                    $tmp[$cursor]['width'] = $row[4];
                                    $tmp[$cursor]['length'] = $row[5];

                                    // Вставляем информацию о частях в базу данных
                                    $stmt = $conn->prepare(
                                        "INSERT INTO project_parts (group_id, level_id, project_id, part_name, part_height, part_width, part_length, part_quantity)
                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
                                    );
                                    $stmt->bind_param(
                                        "iiisssii",
                                        $current_group_id, $current_level_id, $pid,
                                        $tmp[$cursor]['tag'], $tmp[$cursor]['height'],
                                        $tmp[$cursor]['width'], $tmp[$cursor]['length'], $tmp[$cursor]['quantity']
                                    );
                                    $stmt->execute();
                                    $stmt->close();

                                    $i = 0;
                                }
                            }
                        }
                    }
                }

                $result['status'] = 'success';
                $result['project_id'] = $pid;
                $result['file'] = $file;
                $result['archive'] = $Tree;

            } else {
                $result['log'][] = zipFileErrMsg($zip);
            }

            $za->close();
            unlink('tmp/tmp.zip');

            $result['status'] = 'success';
            $result['message'] = 'Codes successfuly imported and sawlist created!';

        } else {
            $result['status'] = 'error';
            $result['message'] = 'File downloading failed';
        }

    } else {
        // Codes alredy imported
        // $codes_exists !== null
        $result['status'] = 'error';
        $result['message'] = "Codes alredy imported. If you want update them, apply patch file or remove previous codes.";
    }

}

// Возвращаем результат в формате JSON
echo json_encode($result);

// Закрываем соединение с базой данных
$conn->close();
