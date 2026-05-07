<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: reset_password.html');
    exit;
}

$username = trim((string)($_POST['username'] ?? ''));
$newPassword = (string)($_POST['newpassword'] ?? '');

if ($username === '' || $newPassword === '') {
    header('Location: reset_password.html?error=missing');
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

    $checkStmt = $pdo->prepare('SELECT id FROM users WHERE username = :username LIMIT 1');
    $checkStmt->execute(['username' => $username]);
    $existing = $checkStmt->fetch();

    if (!$existing) {
        header('Location: reset_password.html?error=user_not_found');
        exit;
    }

    $passwordHash = password_hash($newPassword, PASSWORD_DEFAULT);

    $updateStmt = $pdo->prepare(
        'UPDATE users SET password_hash = :password_hash WHERE username = :username'
    );
    $updateStmt->execute([
        'password_hash' => $passwordHash,
        'username' => $username,
    ]);

    header('Location: login.html?reset=1');
    exit;
} catch (Throwable $e) {
    header('Location: reset_password.html?error=server');
    exit;
}
