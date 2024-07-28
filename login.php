<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$mock_users = [
    ['username' => 'farmer1', 'email' => 'farmer1@example.com', 'password' => '$2y$10$eW5lZWQxJjZXN2ZlbXBmYjAuMWYxNjA0YmQxZ2Y5ZWIyZDA5ZGZlWQ=='], // password1
    ['username' => 'farmer2', 'email' => 'farmer2@example.com', 'password' => '$2y$10$eW5lZWQxJjZXN2ZlbXBmYjAuMWYxNjA0YmQxZ2Y5ZWIyZDA5ZGZlWQ=='], // password2
    ['username' => 'farmer3', 'email' => 'farmer3@example.com', 'password' => '$2y$10$eW5lZWQxJjZXN2ZlbXBmYjAuMWYxNjA0YmQxZ2Y5ZWIyZDA5ZGZlWQ=='], // password3
    ['username' => 'farmer4', 'email' => 'farmer4@example.com', 'password' => '$2y$10$eW5lZWQxJjZXN2ZlbXBmYjAuMWYxNjA0YmQxZ2Y5ZWIyZDA5ZGZlWQ=='], // password4
    ['username' => 'farmer5', 'email' => 'farmer5@example.com', 'password' => '$2y$10$eW5lZWQxJjZXN2ZlbXBmYjAuMWYxNjA0YmQxZ2Y5ZWIyZDA5ZGZlWQ==']  // password5
];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    foreach ($mock_users as $user) {
        if ($user['username'] === $username && password_verify($password, $user['password'])) {
            echo "Login successful.";
            header('Location: index.html');
            exit();
        }
    }
    echo "Invalid username or password.";
}
?>
