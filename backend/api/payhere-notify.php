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

$postData = file_get_contents('php://input');

if (!empty($postData)) {
    $data = json_decode($postData, true);

    if ($data && isset($data['order_id'])) {
        try {
            $statusCode = intval($data['status_code'] ?? 0);
            $newStatus = $statusCode === 2 ? 'completed' : 'failed';

            $stmt = $pdo->prepare(
                'UPDATE orders SET status = ?, payment_data = ?, updated_at = NOW() WHERE order_id = ?'
            );
            $stmt->execute([$newStatus, json_encode($data), $data['order_id']]);

            if ($newStatus === 'completed') {
                $stmt = $pdo->prepare('SELECT * FROM orders WHERE order_id = ?');
                $stmt->execute([$data['order_id']]);
                $order = $stmt->fetch();

                if ($order) {
                    $emailSent = sendOrderConfirmationEmail($order);
                    error_log('PayHere notify: order ' . $data['order_id'] . ' completed, email sent: ' . ($emailSent ? 'yes' : 'no'));
                }
            }

            echo json_encode(['success' => true, 'message' => 'Notification received']);
            exit;
        } catch (Exception $e) {
            error_log('PayHere notify error: ' . $e->getMessage());
        }
    }
}

http_response_code(200);
echo json_encode(['success' => true]);
