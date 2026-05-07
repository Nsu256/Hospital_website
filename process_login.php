<?php
declare(strict_types=1);

session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.html');
    exit;
}

$username = trim((string)($_POST['username'] ?? ''));
$password = (string)($_POST['password'] ?? '');

if ($username === '' || $password === '') {
    header('Location: login.html?error=missing');
    exit;
}

try {
    require __DIR__ . '/db.php';

    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
    );

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare(
        'INSERT INTO users (username, password_hash)
         VALUES (:username, :password_hash)
         ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)'
    );
    $stmt->execute([
        'username' => $username,
        'password_hash' => $passwordHash,
    ]);

    $fetchStmt = $pdo->prepare('SELECT id, username FROM users WHERE username = :username LIMIT 1');
    $fetchStmt->execute(['username' => $username]);
    $user = $fetchStmt->fetch();

    if (!$user) {
        header('Location: login.html?error=server');
        exit;
    }

    $_SESSION['user_id'] = (int)$user['id'];
    $_SESSION['username'] = (string)$user['username'];

    header('Location: index.html');
    exit;
} catch (Throwable $e) {
    header('Location: login.html?error=server');
    exit;
}
