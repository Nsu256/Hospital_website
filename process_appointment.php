<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Method Not Allowed</title></head><body><h1>Method Not Allowed</h1><p>Please submit the appointment form from the site.</p></body></html>';
    exit;
}

function clean_value(string $value): string
{
    return trim(strip_tags($value));
}

function render_response(string $title, string $message, bool $success): void
{
    $safeTitle = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
    $safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $accent = $success ? '#0b74ff' : '#d33';

    echo '<!DOCTYPE html>';
    echo '<html lang="en">';
    echo '<head>';
    echo '<meta charset="UTF-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    echo '<title>' . $safeTitle . '</title>';
    echo '<style>';
    echo 'body{font-family:Arial,sans-serif;min-height:100vh;display:grid;place-items:center;margin:0;background:#f4f9ff;color:#102033;}';
    echo '.card{max-width:560px;padding:32px;border-radius:20px;background:#fff;box-shadow:0 20px 50px rgba(0,0,0,.12);border-top:8px solid ' . $accent . ';}';
    echo 'a{display:inline-block;margin-top:20px;color:#0b74ff;text-decoration:none;font-weight:700;}';
    echo '</style>';
    echo '</head>';
    echo '<body>';
    echo '<main class="card">';
    echo '<h1>' . $safeTitle . '</h1>';
    echo '<p>' . $safeMessage . '</p>';
    echo '<a href="index.html">Back to home</a>';
    echo '</main>';
    echo '</body>';
    echo '</html>';
}

$fullName = clean_value($_POST['fullname'] ?? '');
$email = clean_value($_POST['email'] ?? '');
$phone = clean_value($_POST['phone'] ?? '');
$preferredDate = clean_value($_POST['date'] ?? '');
$doctor = clean_value($_POST['doctor'] ?? '');
$message = clean_value($_POST['message'] ?? '');

$errors = [];

if ($fullName === '') {
    $errors[] = 'Full name is required.';
}

if ($email === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    $errors[] = 'A valid email address is required.';
}

if ($phone === '') {
    $errors[] = 'Phone number is required.';
}

if ($preferredDate === '') {
    $errors[] = 'Preferred date is required.';
}

if ($doctor === '') {
    $errors[] = 'Please select a doctor.';
}

if ($errors !== []) {
    render_response('Appointment could not be submitted', implode(' ', $errors), false);
    exit;
}

$payload = [
    'submitted_at' => date('c'),
    'name' => $fullName,
    'email' => $email,
    'phone' => $phone,
    'preferred_date' => $preferredDate,
    'doctor' => $doctor,
    'message' => $message,
];

$storageDirectory = __DIR__ . '/data';
if (!is_dir($storageDirectory)) {
    @mkdir($storageDirectory, 0775, true);
}

$storageFile = $storageDirectory . '/appointments.jsonl';
$record = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if ($record !== false) {
    @file_put_contents($storageFile, $record . PHP_EOL, FILE_APPEND | LOCK_EX);
}

render_response('Appointment submitted', 'Your appointment request has been received. We will contact you soon.', true);
