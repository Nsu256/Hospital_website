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
    require __DIR__ . '/storage.php';

    $user = $FileStorage->getUserByUsername($username);

    if (!$user) {
        header('Location: reset_password.html?error=user_not_found');
        exit;
    }

    $passwordHash = password_hash($newPassword, PASSWORD_DEFAULT);
    $FileStorage->updateUserPassword($username, $passwordHash);

    header('Location: login.html?reset=1');
    exit;
} catch (Throwable $e) {
    header('Location: reset_password.html?error=server');
    exit;
}
