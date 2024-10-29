<pre>
<?php

date_default_timezone_set('Europe/Riga');
ini_set('default_socket_timeout', 5);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
mysqli_report(MYSQLI_REPORT_OFF);

$time = time();
$toinsert = [];

$mysqli = new mysqli('localhost', 'framer', 'stefan91', 'framer');

if (!$mysqli->connect_errno) {

    echo "Сейчас " . date('Y-m-d H:i:s', $time) . ".\n";
    echo "Подключение к БД установлено.\n";

    $updated = $mysqli->query("select value as k2_latest_update from vars where variable = 'k2_latest_update'")->fetch_assoc()['k2_latest_update'];
    $updated = (int) $updated;

    echo "Последнее обновление таблицы " . date('Y-m-d H:i:s', $updated) . ".\n";

    if ($log = json_decode(file_get_contents('http://94.101.224.82:8081/log.php'))) {

        $last_row = end($log);

        echo "Связь с Hundegger K2 установлена.\n";
        echo "Прошло времени с последнего обновления: " . round(abs($last_row->finished->first - $updated) / 60) . " минут.\n";
        echo "Последняя напиленная деталь: ";
        print_r($last_row);
        echo "Дата и время последней детали: {$last_row->finished->first}.\n";

        array_walk($log, function ($value) {

            global $updated, $toinsert, $mysqli;

            if ($value->part != "Rest timber") {
                if (($value->finished->last && $value->finished->last >= $updated) || ($value->finished->first >= $updated)) {

                    echo "({$value->finished->last} && {$value->finished->last} >= {$updated}) || ({$value->finished->first} >= {$updated})\n";
                    $toinsert[] = $value;

                    if ($value->finished->last) {

                        $mysqli->query("update parts_test_k2 set quantity = '{$value->quantity}', last_finished = '{$value->finished->last}' where name = '{$value->part}' and finished = '{$value->finished->first}'");
                        echo "\nupdate parts_test_k2 set quantity = '{$value->quantity}', last_finished = '{$value->finished->last}' where name = '{$value->part}' and finished = '{$value->finished->first}'\n";
                        echo "Обновлена запись для \"{$value->part}\".\n\n";

                    } else {

                        $mysqli->query("insert into parts_test_k2 (name, quantity, finished, machine) values ('{$value->part}', '{$value->quantity}', '{$value->finished->first}', 'Hundegger K2')");
                        echo "\ninsert into parts_test_k2 (name, quantity, finished, machine) values ('{$value->part}', '{$value->quantity}', '{$value->finished->first}', 'Hundegger K2')\n";
                        echo "Добавлена новая запись для \"{$value->part}\".\n\n";

                    }

                }
            }

        });

        echo "Новых деталей импортировано: " . count($toinsert) . "\n";

        $mysqli->query("update vars set value = 'Online' where variable = 'k2_status'");
        $mysqli->query("update vars set value = '{$time}' where variable = 'k2_status_updated'");
        $mysqli->query("update vars set value = '{$time}' where variable = 'k2_latest_update'");

    } else {

        echo "Ошибка чтения данных Hundegger K2. Машина не запущена или отсутсвует интернет соединение.\n";

        $mysqli->query("update vars set value = 'Offline' where variable = 'k2_status'");
        $mysqli->query("update vars set value = '{$time}' where variable = 'k2_status_updated'");

    }

} else {
    echo "Ошибка соединения mysqli: {$mysqli->connect_error}.\n";
}

$mysqli->close();

echo "Скрипт выполнен за " . (time() - $time) . "мс.\n";

?>