<?php
	require_once(__DIR__ . "/../model/config.php");

	//isset makes sure there is info present in the variable
	//function makes sure user is authenticated 
	function authenticateUser() {
		if (!isset($_SESSION["authenticated"])) {
			return false;
		}
		else {
			if ($_SESSION["authenticated"] != true) {
				return false;
			}
			else{
				return true;
			}
		}
	}