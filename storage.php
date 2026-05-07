<?php
declare(strict_types=1);

// File-based storage for users and appointments
// This works without requiring a database connection

class FileStorage {
    private $dataDir;

    public function __construct($dataDir = __DIR__ . '/data') {
        $this->dataDir = $dataDir;
        if (!is_dir($this->dataDir)) {
            mkdir($this->dataDir, 0755, true);
        }
    }

    private function getUsersFile() {
        return $this->dataDir . '/users.jsonl';
    }

    private function getAppointmentsFile() {
        return $this->dataDir . '/appointments.jsonl';
    }

    // Users methods
    public function getUserByUsername($username) {
        $file = $this->getUsersFile();
        if (!file_exists($file)) return null;
        
        $handle = fopen($file, 'r');
        while ($line = fgets($handle)) {
            $user = json_decode(trim($line), true);
            if ($user && $user['username'] === $username) {
                fclose($handle);
                return $user;
            }
        }
        fclose($handle);
        return null;
    }

    public function verifyPassword($username, $password) {
        $user = $this->getUserByUsername($username);
        if (!$user) return false;
        return password_verify($password, $user['password_hash']);
    }

    public function saveUser($username, $passwordHash) {
        $file = $this->getUsersFile();
        $user = $this->getUserByUsername($username);
        
        if ($user) {
            // Update existing user
            $lines = [];
            $handle = fopen($file, 'r');
            while ($line = fgets($handle)) {
                $existing = json_decode(trim($line), true);
                if ($existing && $existing['username'] === $username) {
                    $existing['password_hash'] = $passwordHash;
                    $existing['updated_at'] = date('Y-m-d H:i:s');
                    $lines[] = json_encode($existing);
                } else {
                    $lines[] = trim($line);
                }
            }
            fclose($handle);
            
            file_put_contents($file, implode("\n", $lines) . "\n");
            return ['id' => $user['id'], 'username' => $username];
        } else {
            // Create new user
            $userId = time(); // Use timestamp as simple ID
            $newUser = [
                'id' => $userId,
                'username' => $username,
                'password_hash' => $passwordHash,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ];
            file_put_contents($file, json_encode($newUser) . "\n", FILE_APPEND);
            return ['id' => $userId, 'username' => $username];
        }
    }

    public function updateUserPassword($username, $newPasswordHash) {
        $file = $this->getUsersFile();
        $user = $this->getUserByUsername($username);

        if (!$user) {
            return false;
        }

        $lines = [];
        $handle = fopen($file, 'r');
        while ($line = fgets($handle)) {
            $existing = json_decode(trim($line), true);
            if ($existing && $existing['username'] === $username) {
                $existing['password_hash'] = $newPasswordHash;
                $existing['updated_at'] = date('Y-m-d H:i:s');
                $lines[] = json_encode($existing);
            } else {
                $lines[] = trim($line);
            }
        }
        fclose($handle);

        file_put_contents($file, implode("\n", $lines) . "\n");
        return true;
    }

    // Appointments methods
    public function createAppointment($data) {
        $file = $this->getAppointmentsFile();
        $data['id'] = time() . rand(1000, 9999);
        $data['created_at'] = date('Y-m-d H:i:s');
        file_put_contents($file, json_encode($data) . "\n", FILE_APPEND);
        return $data;
    }

    public function getAppointmentsByUserId($userId, $limit = 50) {
        $file = $this->getAppointmentsFile();
        if (!file_exists($file)) return [];
        
        $appointments = [];
        $handle = fopen($file, 'r');
        while ($line = fgets($handle)) {
            $appt = json_decode(trim($line), true);
            if ($appt && ($appt['user_id'] === $userId || $userId === null)) {
                $appointments[] = $appt;
            }
        }
        fclose($handle);
        
        // Sort by date descending and limit
        usort($appointments, fn($a, $b) => strtotime($b['date'] ?? 0) - strtotime($a['date'] ?? 0));
        return array_slice($appointments, 0, $limit);
    }
}

$FileStorage = new FileStorage(__DIR__ . '/data');
