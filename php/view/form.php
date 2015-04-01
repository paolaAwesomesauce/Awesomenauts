	<?php
	//helps us reach certain files with minimal work
	require_once(__DIR__ . "/../model/config.php");

	require_once(__DIR__ . "/../controller/login-varify.php");

	//checks if users are login and if not redirects or kills program
	if (!authenticateUser()) {
		header("Location: " . $path . "index.php");
		die();
	}
?>

<h1>Create Blog Post<h1>

<!-- sends information to post and echos the path for the information to follow -->
<form method="post" action="<?php echo $path . "controller/create-post.php";?>">
<!-- Creates div and label for title and a text input for title -->
	<div>
		<label for="title"> Title: </label>
		<input type="text" name="title" />
	</div>
	
	<!-- creates div with lablel dor posts and a textarea for posts -->
	<div>
		<label for="post">Post: </label>
		<textarea name="post"></textarea>
	</div>

	<!-- Makes a submit button for our blog posts -->
	<div>
		<button type="submit" class="btn btn-success">Submit</button>
	</div>
</form>