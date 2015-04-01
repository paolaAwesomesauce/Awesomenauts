<?php
	//looks for config.php where we refactored our code
	require_once(__DIR__ . "/../model/config.php");

	//establishes connection to dattabase
	

	// varible filter the input, gets the posts from title and filters it to make sure its a string 
	$title = filter_input(INPUT_POST, "title", FILTER_SANITIZE_STRING);

	//varible filter the input, gets the posts from post and filters it to make sure its a string 
	$post = filter_input(INPUT_POST, "post", FILTER_SANITIZE_STRING);

	//variable adds date to our post
	$date = new DateTime('today');

	//variable adds time to our post
	$time = new DateTime('America/Los_Angeles');

	//query sends the information stores in $title and $post. Either true or not true
	$query = $_SESSION["connection"]->query("INSERT INTO posts SET title = '$title', post = '$post'");

	//checks weather the query is true or not using sessins variables
	//echos date and time on our post form   
	if($query){
		echo "<p>Successfully inserted post: $title</p>";
		echo "Posted on: " . $date->format("M/D/Y") . " at " . $time->format("g:i");

	}
	else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}


	

?>