<?php
declare(strict_types=1);
session_start();
header('Content-Type: application/json; charset=utf-8');

try {
    require __DIR__ . '/storage.php';

    $mine = isset($_GET['mine']) && ($_GET['mine'] === '1' || $_GET['mine'] === 'true');

    if ($mine) {
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(['error' => 'not_authenticated']);
            exit;
        }
        $userId = $_SESSION['user_id'];
    } elseif (isset($_GET['user_id'])) {
        // allow admin to query other users if is_admin flag set in session
        if (empty($_SESSION['is_admin'])) {
            http_response_code(403);
            echo json_encode(['error' => 'forbidden']);
            exit;
        }
        $userId = $_GET['user_id'];
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'missing_param']);
        exit;
    }

    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
    $limit = $limit > 0 && $limit <= 500 ? $limit : 50;

    $appointments = $FileStorage->getAppointmentsByUserId($userId, $limit);

    echo json_encode(['appointments' => $appointments]);
    exit;

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'server_error']);
    exit;
}
