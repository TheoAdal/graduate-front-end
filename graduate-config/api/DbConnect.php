<?php
	/**
	* Database Connection
	*/
	class DbConnect {
		private $server = "localhost";
		private $dbname = "graduate_first";
		private $user = "root";
		private $pass = "";
        
        private static $instance;

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
				return null;
			}
		}

        public static function getInstance() {
            if (!self::$instance) {
                self::$instance = new self();
            }
            return self::$instance;
        }
	}

// palio config file:

// $host = "localhost";
// $username = "root";
// $password = "";
// $dbname = "kazanicy_clock";
// $con = mysqli_connect($host, $username, $password, $dbname,4306);


// if (!$con) {
//     die("Connection failed!" . mysqli_connect_error());
// }




