<pre>
<?php

require 'vendor/autoload.php';

use \Firebase\JWT\JWT;

$conn = new mysqli('localhost', 'framer', 'stefan91', 'framer');

$secret_key = 'mostsecuredsecretkeyeveryouseeninyourlife';

print_r($_SERVER);

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action'] === 'change_password') {

	$login = $_GET['login'];
	$password = password_hash($_GET['password'], PASSWORD_BCRYPT);

	print_r($_GET);

	$stmt = $conn->prepare("UPDATE users SET password = ? WHERE login = ?");
	$stmt->bind_param("ss", $password, $login);
	if ($stmt->execute()) {
		echo json_encode([
			"status" => "success",
			"message" => "Password successfuly changed."
		]);
	} else {
		echo json_encode([
			"status" => "error",
			"message" => "Change password error."
		]);
	}
	$stmt->close();

} elseif ($_GET['action'] === 'compare_password' || $_POST['action'] === 'auth') {

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
			"message" => "Correct password.",
			"token" => $jwt
		]);
	} else {
		echo json_encode([
			"status" => "error",
			"message" => "Wrong password."
		]);
	}
	$stmt->close();

}

$conn->close();

?>
