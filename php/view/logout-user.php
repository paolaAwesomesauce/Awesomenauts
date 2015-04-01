<?php
	require_once(__DIR__ . "/../model/config.php");

	//logs out user
	unset($_SESSION["authenticated"]);

	//closes session
	session_destroy();

	//sends u to index page
	header("Location: " . $path . "index");


