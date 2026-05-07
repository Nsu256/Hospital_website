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

    // Check if user exists
    $existingUser = $FileStorage->getUserByUsername($username);

    if ($existingUser) {
        // User exists - verify password
        if (!$FileStorage->verifyPassword($username, $password)) {
            header('Location: login.html?error=invalid');
            exit;
        }
        // Password is correct, use existing user
        $user = $existingUser;
    } else {
        // User doesn't exist - create new user (registration)
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $user = $FileStorage->saveUser($username, $passwordHash);

        if (!$user) {
            header('Location: login.html?error=server');
            exit;
        }
    }

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];

    header('Location: home.html');
    exit;
} catch (Throwable $e) {
    header('Location: login.html?error=server');
    exit;
}
