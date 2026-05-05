<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Method Not Allowed</title></head><body><h1>Method Not Allowed</h1><p>Please submit the medical form from the site.</p></body></html>';
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

$patientName = clean_value($_POST['patient_name'] ?? '');
$phoneNumber = clean_value($_POST['phone_number'] ?? '');
$address = clean_value($_POST['address'] ?? '');
$emailAddress = clean_value($_POST['email_address'] ?? '');
$primarySymptoms = clean_value($_POST['primary_symptoms'] ?? '');
$recentHealthHistory = clean_value($_POST['recent_health_history'] ?? '');
$bodyTemperature = clean_value($_POST['body_temperature'] ?? '');
$bodyWeight = clean_value($_POST['body_weight'] ?? '');
$bloodPressure = clean_value($_POST['blood_pressure'] ?? '');
$activityLevel = clean_value($_POST['activity_level'] ?? '');
$preliminaryDiagnosis = clean_value($_POST['preliminary_diagnosis'] ?? '');

$errors = [];

if ($patientName === '') {
    $errors[] = 'Patient name is required.';
}

if ($phoneNumber === '') {
    $errors[] = 'Phone number is required.';
}

if ($address === '') {
    $errors[] = 'Address is required.';
}

if ($emailAddress === '' || filter_var($emailAddress, FILTER_VALIDATE_EMAIL) === false) {
    $errors[] = 'A valid email address is required.';
}

if ($primarySymptoms === '') {
    $errors[] = 'Primary symptoms are required.';
}

if ($recentHealthHistory === '') {
    $errors[] = 'Recent health history is required.';
}

if ($bodyTemperature === '') {
    $errors[] = 'Body temperature is required.';
}

if ($bodyWeight === '') {
    $errors[] = 'Body weight is required.';
}

if ($bloodPressure === '') {
    $errors[] = 'Blood pressure is required.';
}

if ($activityLevel === '') {
    $errors[] = 'Activity level is required.';
}

if ($preliminaryDiagnosis === '') {
    $errors[] = 'Preliminary diagnosis is required.';
}

if ($errors !== []) {
    render_response('Medical form could not be submitted', implode(' ', $errors), false);
    exit;
}

$payload = [
    'submitted_at' => date('c'),
    'patient_name' => $patientName,
    'phone_number' => $phoneNumber,
    'address' => $address,
    'email_address' => $emailAddress,
    'primary_symptoms' => $primarySymptoms,
    'recent_health_history' => $recentHealthHistory,
    'body_temperature' => $bodyTemperature,
    'body_weight' => $bodyWeight,
    'blood_pressure' => $bloodPressure,
    'activity_level' => $activityLevel,
    'preliminary_diagnosis' => $preliminaryDiagnosis,
];

$storageDirectory = __DIR__ . '/data';
if (!is_dir($storageDirectory)) {
    @mkdir($storageDirectory, 0775, true);
}

$storageFile = $storageDirectory . '/medical_forms.jsonl';
$record = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if ($record !== false) {
    @file_put_contents($storageFile, $record . PHP_EOL, FILE_APPEND | LOCK_EX);
}

render_response('Medical form submitted', 'Your medical form has been received.', true);
