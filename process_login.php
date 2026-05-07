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
    require __DIR__ . '/storage.php';

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $user = $FileStorage->saveUser($username, $passwordHash);

    if (!$user) {
        header('Location: login.html?error=server');
        exit;
    }

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];

    header('Location: home.html');
    exit;
} catch (Throwable $e) {
    header('Location: login.html?error=server');
    exit;
}
