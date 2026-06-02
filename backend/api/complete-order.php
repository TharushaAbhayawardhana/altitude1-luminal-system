<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/mail.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['order_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Order ID is required']);
    exit;
}

$orderId = trim($data['order_id']);

try {
    $stmt = $pdo->prepare('SELECT * FROM orders WHERE order_id = ?');
    $stmt->execute([$orderId]);
    $order = $stmt->fetch();

    if (!$order) {
        http_response_code(404);
        echo json_encode(['error' => 'Order not found']);
        exit;
    }

    if ($order['status'] === 'completed') {
        echo json_encode([
            'success' => true,
            'message' => 'Order already completed',
            'order_id' => $orderId,
            'status' => 'completed',
        ]);
        exit;
    }

    $stmt = $pdo->prepare(
        'UPDATE orders SET status = ?, updated_at = NOW() WHERE order_id = ?'
    );
    $stmt->execute(['completed', $orderId]);

    $emailSent = sendOrderConfirmationEmail($order);

    echo json_encode([
        'success' => true,
        'message' => 'Order completed successfully',
        'order_id' => $orderId,
        'status' => 'completed',
        'email_sent' => $emailSent,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
    error_log('Complete order error: ' . $e->getMessage());
}
