<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "typer_shark";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user = $_POST['username'];
$pass = $_POST['password'];

$sql = "SELECT * FROM users WHERE username='$user'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($pass, $row['password'])) {
        $_SESSION['username'] = $user;
        if ($user == 'opher' || $user == 'anirrud') {
            $_SESSION['admin'] = true;
            header("Location: admin_panel.php");
        } else {
            header("Location: game.php");
        }
    } else {
        echo "Invalid password. <a href='login.html'>Try again</a>.";
    }
} else {
    echo "No user found. <a href='login.html'>Try again</a>.";
}

$conn->close();
?>
