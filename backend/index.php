<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$requestUri = $_SERVER['REQUEST_URI'];
$basePath = '/api';

$routes = [
    '/api/contact'          => __DIR__ . '/api/contact.php',
    '/api/orders'           => __DIR__ . '/api/orders.php',
    '/api/payhere-notify'   => __DIR__ . '/api/payhere-notify.php',
    '/api/payhere-hash'     => __DIR__ . '/api/payhere-hash.php',
    '/api/send-welcome'     => __DIR__ . '/api/send-welcome.php',
    '/api/complete-order'   => __DIR__ . '/api/complete-order.php',
    '/api/users'            => __DIR__ . '/api/users.php',
];

$path = parse_url($requestUri, PHP_URL_PATH);

if (isset($routes[$path])) {
    require $routes[$path];
} else {
    echo json_encode([
        'name' => 'Luminal Systems API',
        'version' => '1.0.0',
        'endpoints' => [
            '/api/contact'          => 'POST - Submit contact form',
            '/api/orders'           => 'POST - Create order',
            '/api/payhere-notify'   => 'POST - PayHere payment notification',
            '/api/payhere-hash'     => 'POST - Generate PayHere payment hash',
            '/api/send-welcome'     => 'POST - Send welcome email after registration',
            '/api/complete-order'   => 'POST - Complete order and send confirmation',
        ],
    ]);
}
