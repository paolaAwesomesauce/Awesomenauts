<?php
	require_once(__DIR__ . "/../model/config.php");

	//inputs username to database
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);

	//inputs password to database
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

	//creates unique id for your user
	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

	//encrypts password for us
	$hashedPassword = crypt($password, $salt);

	//query sends email, username, and encrypted password to database
	// sends info on the exp points
	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
		. "email = '$email',"
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt'"
		. "exp = 0, "
		. "exp1 = 0, "
		. "exp2 = 0, "
		. "exp3 = 0, "
		. "exp4 = 0, ");

	$_SESSION["name"] = $username;

	//if/else statement checks if created user or nah
	if ($query) {
		// need this for Ajax on index.php
		echo "true";
	}
	else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}




?>