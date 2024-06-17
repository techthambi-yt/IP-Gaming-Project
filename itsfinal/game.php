<?php
session_start();
if (!isset($_SESSION['username']) || isset($_SESSION['admin'])) {
    header("Location: login.html");
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "typer_shark";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT word FROM words";
$result = $conn->query($sql);

$words = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $words[] = $row['word'];
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Typer Shark Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="game-container">
        <div id="game-area">
            <div id="player"></div>
        </div>
        <input type="text" id="word-input" placeholder="Type here...">
        <div id="score">Score: 0</div>
        <div id="health">Health: 3</div>
    </div>
    <script>
        const words = <?php echo json_encode($words); ?>;
    </script>
    <script src="script.js"></script>
</body>
</html>
