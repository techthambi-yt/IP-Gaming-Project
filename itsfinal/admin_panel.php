<?php
session_start();

if (!isset($_SESSION['admin'])) {
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['add_word'])) {
        $word = $_POST['word'];
        $sql = "INSERT INTO words (word) VALUES ('$word')";
        if ($conn->query($sql) === TRUE) {
            echo "Word added successfully.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } elseif (isset($_POST['delete_user'])) {
        $username = $_POST['username'];
        $sql = "DELETE FROM users WHERE username='$username'";
        if ($conn->query($sql) === TRUE) {
            echo "User deleted successfully.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

$sql = "SELECT username FROM users";
$result = $conn->query($sql);

$users = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row['username'];
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link rel="stylesheet" href="admin.css">
</head>
<body>
    <div class="container">
        <h2>Welcome, Admin</h2>
        <form action="admin_panel.php" method="post">
            <h3>Add a New Word</h3>
            <input type="text" name="word" placeholder="Enter new word" required>
            <button type="submit" name="add_word">Add Word</button>
        </form>
        <form action="admin_panel.php" method="post">
            <h3>Delete a User</h3>
            <select name="username" required>
                <option value="">Select user</option>
                <?php foreach ($users as $user): ?>
                    <option value="<?= $user ?>"><?= $user ?></option>
                <?php endforeach; ?>
            </select>
            <button type="submit" name="delete_user">Delete User</button>
        </form>
        <a href="logout.php">Logout</a>
    </div>
</body>
</html>
