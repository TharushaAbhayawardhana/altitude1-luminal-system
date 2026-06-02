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

// GET: fetch order by order_id
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $orderId = $_GET['order_id'] ?? '';

    if (empty($orderId)) {
        http_response_code(400);
        echo json_encode(['error' => 'order_id is required']);
        exit;
    }

    try {
        $stmt = $pdo->prepare('SELECT * FROM orders WHERE order_id = ?');
        $stmt->execute([$orderId]);
        $order = $stmt->fetch();

        if ($order) {
            echo json_encode(['success' => true, 'order' => $order]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Order not found']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error']);
        error_log('Order GET error: ' . $e->getMessage());
    }
    exit;
}

// POST: create order
require_once __DIR__ . '/../config/mail.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request data']);
    exit;
}

$orderId = $data['orderId'] ?? '';
$planId = $data['planId'] ?? '';
$planName = $data['planName'] ?? '';
$amount = $data['amount'] ?? 0;
$currency = $data['currency'] ?? 'monthly';
$firstName = trim($data['firstName'] ?? '');
$lastName = trim($data['lastName'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$address = trim($data['address'] ?? '');
$city = trim($data['city'] ?? '');

$errors = [];
if (empty($orderId)) $errors[] = 'Order ID is required';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required';
if (empty($amount)) $errors[] = 'Amount is required';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['error' => 'Validation failed', 'details' => $errors]);
    exit;
}

try {
    $stmt = $pdo->prepare(
        'INSERT INTO orders (order_id, plan_id, plan_name, amount, currency, first_name, last_name, email, phone, address, city, status, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())'
    );

    $status = 'pending';
    $stmt->execute([$orderId, $planId, $planName, $amount, $currency, $firstName, $lastName, $email, $phone, $address, $city, $status]);

    echo json_encode([
        'success' => true,
        'message' => 'Order created successfully',
        'order_id' => $orderId,
        'status' => $status,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
    error_log('Order API error: ' . $e->getMessage());
}
