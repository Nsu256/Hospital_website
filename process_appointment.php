<?php
declare(strict_types=1);
session_start();
header('Content-Type: application/json; charset=utf-8');

try {
    require __DIR__ . '/storage.php';

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'method_not_allowed']);
        exit;
    }

    $fullname = trim($_POST['fullname'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $date = trim($_POST['date'] ?? '');
    $doctor = trim($_POST['doctor'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (!$fullname || !$email || !$phone || !$date || !$doctor) {
        http_response_code(400);
        echo json_encode(['error' => 'missing_fields']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'invalid_email']);
        exit;
    }

    $dateTime = $date . ' 09:00:00';
    $userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

    $appointment = $FileStorage->createAppointment([
        'user_id' => $userId,
        'fullname' => $fullname,
        'email' => $email,
        'phone' => $phone,
        'date' => $dateTime,
        'doctor' => $doctor,
        'notes' => $message
    ]);

    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Appointment booked successfully', 'id' => $appointment['id']]);
    exit;

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'server_error', 'details' => $e->getMessage()]);
    exit;
}

