<?php
	// we are using a class so we wont be repeating the same code over and over again and so it will be easier to read the code.
	// class are a collection of variables and fucntions;makes database an object
	class Database{
		//variables that can only be seen in this file.
		private $connection;
		private $host;
		private $username;
		private $password;
		private $database;

		//is public so we can get to it.
		public $error;

		//the constructor is called on an object after it has been created where you can put code that calls on objects
		//the variables in the braces are global variables
		public function __construct($host, $username, $password, $database){
			$this->host = $host;
			$this->username = $username;
			$this->password = $password;
			$this->database = $database;

		//connects our host,username, and password to mysqli
		//changed $connection to $this->connection
		$this->connection = new mysqli($host, $username, $password);

		//if/else statemant to check if we have a connection error
		if($this->connection->connect_error){
			die("<p>Error: " . $this->connection->connect_error . "</p>");
		}

		else{
			//echo "<p>Success: " . $this->connection->host_info . "</p>";
		}

		//checks if slect_db exsits
		$exsits= $this->connection->select_db($database);

		//creates $database for my admin and checks if we have created it 
		if(!$exsits){
			$query = $this->connection->query("CREATE DATABASE $database");

			if($query){
				//echo "<p>Successfully created database: " . $database . "</p>";

			}
		}

		else{
			echo "<p> Database already exsits </p>";
		}
		}

		//function opens connection
		//A function is a block of statements that can be used repeatedly in a program;will not execute immediately when a page loads;will be executed by a call to the function.
		public function openConnection(){
			//connects our host,username, and password to mysqli
			$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

			//if/else statemant to check if we have a connection error
			if($this->connection->connect_error){
				die("<p>Error: " . $this->connection->connect_error . "</p>");
			}

			else{
				//echo "<p>Success: " . $this->connection->host_info . "</p>";
			}
		}

		//function closes connection
		public function closeConnection(){
			//checks if do we or dont open the connection and then it will be able to close the connection
			//isset makes sure there is info present in the variable;going to return true if there is info if variable doesnt have info there is no need to call the $this->conection->close();
			if(isset($this->connection)){
				$this->connection->close();
			}
		}

		// after you call object you can and be able to specificlly call on the functions above. won't have to constanly repeat ourselves
		public function query($string){
			//opens connection
			$this->openConnection();

			//executes query on database and sends commands through the $string variable
			$query = $this->connection->query($string);

			//checks if there is an error in our connection
			if (!$query) {
				$this->error = $this->connection->error;
			}

			//closes connection
			$this->closeConnection();

			//returns varible query as either true or false.
			return $query;
		}
	}


?>