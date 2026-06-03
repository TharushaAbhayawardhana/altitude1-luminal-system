<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/database.php';

// GET: find user by firebase_uid
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $firebaseUid = trim($_GET['firebase_uid'] ?? '');

    if (empty($firebaseUid)) {
        http_response_code(400);
        echo json_encode(['error' => 'firebase_uid is required']);
        exit;
    }

    try {
        $stmt = $pdo->prepare('SELECT * FROM users WHERE firebase_uid = ?');
        $stmt->execute([$firebaseUid]);
        $user = $stmt->fetch();

        if ($user) {
            echo json_encode(['success' => true, 'user' => $user]);
        } else {
            echo json_encode(['success' => true, 'user' => null]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error']);
        error_log('User GET error: ' . $e->getMessage());
    }
    exit;
}

// POST: create user
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request data']);
    exit;
}

$firebaseUid = trim($data['firebaseUid'] ?? '');
$email = trim($data['email'] ?? '');
$firstName = trim($data['firstName'] ?? '');
$lastName = trim($data['lastName'] ?? '');
$phone = trim($data['phone'] ?? '');

$errors = [];
if (empty($firebaseUid)) $errors[] = 'Firebase UID is required';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required';
if (empty($firstName)) $errors[] = 'First name is required';
if (empty($lastName)) $errors[] = 'Last name is required';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['error' => 'Validation failed', 'details' => $errors]);
    exit;
}

try {
    $stmt = $pdo->prepare(
        'INSERT INTO users (firebase_uid, email, first_name, last_name, phone, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())'
    );
    $stmt->execute([$firebaseUid, $email, $firstName, $lastName, $phone]);
    $userId = $pdo->lastInsertId();

    echo json_encode([
        'success' => true,
        'message' => 'User created successfully',
        'user_id' => (int)$userId,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
    error_log('User API error: ' . $e->getMessage());
}