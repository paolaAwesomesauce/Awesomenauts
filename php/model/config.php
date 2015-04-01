<?php
	
	require_once(__DIR__ . "/../model/Database.php");

	//starts our session
	session_start();
	session_regenerate_id(true);

	//variable stores path for Blog project
	$path = "/Awesomenauts/php";

	//deleted database b/c we don't need it anymore b/c we refactored the code
	//Variable that has our localhost stored in it
	$host = "localhost";
	//Name of our username
	$username = "root";
	//my admin password
	$password = "root";
	//Name of our database
	$database = "awesomenauts_db";

	//isset checks if $_SESSION has the $connection stored in it; only creates database once 
	if(!isset($_SESSION["connection"])){
		//new database object that helps the query on database 
		$connection = new Database($host, $username, $password, $database);

		//stores varible connection in the variable session.
		$_SESSION["connection"] = $connection;
	}



?>