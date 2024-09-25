<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require 'vendor/autoload.php';

use \Firebase\JWT\JWT;

$_POST = json_decode(file_get_contents("php://input"), true);
//print_r($_POST);
$conn = new mysqli('localhost', 'framer', 'stefan91', 'framer');

$secret_key = 'mostsecuredsecretkeyeveryouseeninyourlife';

if ($_GET['action'] === 'reset_password' || $_POST['action'] === 'reset_password') {

	$login = $_GET['login'] ? $_GET['login'] : $_POST['login'];
	$password = password_hash($_GET['password'] ? $_GET['password'] : $_POST['password'], PASSWORD_BCRYPT);

	$stmt = $conn->prepare("UPDATE users SET password = ? WHERE login = ?");
	$stmt->bind_param("ss", $password, $login);
	if ($stmt->execute()) {
		echo json_encode([
			"status" => "success",
			"message" => "Password successfuly changed"
		]);
	} else {
		echo json_encode([
			"status" => "error",
			"message" => "Change password error"
		]);
	}
	$stmt->close();

} elseif ($_GET['action'] === 'auth' || $_POST['action'] === 'auth') {

	$login = $_GET['login'] ? $_GET['login'] : $_POST['login'];
	$password = $_GET['password'] ? $_GET['password'] : $_POST['password'];

	$stmt = $conn->prepare("SELECT password FROM users WHERE login = ?");
	$stmt->bind_param("s", $login);
	$stmt->execute();
	$stmt->bind_result($hashed_password);
	$stmt->fetch();

	if (password_verify($password, $hashed_password)) {
		$token = [
			"iss" => "http://app.frame-house.eu",
			"aud" => "http://app.frame-house.eu",
			"iat" => time(),
			"nbf" => time(),
			"data" => [
				"username" => $login
			]
		];
		$jwt = JWT::encode($token, $secret_key, "HS256");
		echo json_encode([
			"status" => "success",
			"message" => "Correct password",
			"token" => $jwt
		]);
	} else {
		echo json_encode([
			"status" => "error",
			"message" => "Wrong username or password"
		]);
	}
	$stmt->close();

}

$conn->close();

?>
