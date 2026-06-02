<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/payhere.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['order_id']) || !isset($input['amount']) || !isset($input['currency'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required parameters: order_id, amount, currency']);
    exit;
}

$orderId = $input['order_id'];
$amount = number_format((float)$input['amount'], 2, '.', '');
$currency = strtoupper($input['currency']);

$hash = strtoupper(md5(
    PAYHERE_MERCHANT_ID .
    $orderId .
    $amount .
    $currency .
    strtoupper(md5(PAYHERE_MERCHANT_SECRET))
));

echo json_encode([
    'hash' => $hash,
    'merchant_id' => PAYHERE_MERCHANT_ID,
]);
