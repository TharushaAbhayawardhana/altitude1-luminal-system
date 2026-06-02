<?php

require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function getMailer()
{
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'tharusharandima1@gmail.com';
        $mail->Password   = 'dedwsxahabuhxcao';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->SMTPDebug  = 0;

        $mail->setFrom('tharusharandima1@gmail.com', 'Luminal Systems');

        return $mail;
    } catch (Exception $e) {
        error_log('Mailer error: ' . $e->getMessage());
        throw $e;
    }
}

function sendContactEmail($name, $email, $subject, $message)
{
    try {
        $mail = getMailer();
        $mail->addAddress('tharusharandima1@gmail.com');
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission - $subject";
        $mail->Body = "
            <div style='font-family:Arial; padding:20px'>
                <h2>New Contact Form Submission</h2>
                <hr>
                <p><b>Name:</b> {$name}</p>
                <p><b>Email:</b> {$email}</p>
                <p><b>Subject:</b> {$subject}</p>
                <p><b>Message:</b><br>" . nl2br(htmlspecialchars($message)) . "</p>
            </div>
        ";
        $mail->AltBody = "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message";
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log('Mail failed (contact admin): ' . $e->getMessage());
        return false;
    }
}

function sendContactAutoReply($name, $email, $subject)
{
    try {
        $mail = getMailer();
        $mail->addAddress($email, $name);
        $mail->isHTML(true);
        $mail->Subject = "Thank you for contacting Luminal Systems";
        $mail->Body = "
            <div style='font-family:Arial; padding:20px; max-width:600px'>
                <h2 style='color:#6366f1;'>Thank you for reaching out!</h2>
                <hr style='border:1px solid #eee'>
                <p>Hi <b>{$name}</b>,</p>
                <p>We have received your message regarding <b>\"{$subject}\"</b>.</p>
                <p>Our team will review it and get back to you within 24 hours.</p>
                <br>
                <p>Best regards,</p>
                <p><b>Luminal Systems Team</b></p>
                <hr style='border:1px solid #eee'>
                <p style='font-size:12px; color:#888;'>This is an automated response. Please do not reply directly.</p>
            </div>
        ";
        $mail->AltBody = "Thank you for contacting Luminal Systems, $name. We have received your message about \"$subject\" and will respond within 24 hours.";
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log('Mail failed (contact auto-reply): ' . $e->getMessage());
        return false;
    }
}

function sendWelcomeEmail($email, $name)
{
    try {
        $mail = getMailer();
        $mail->addAddress($email, $name);
        $mail->isHTML(true);
        $mail->Subject = "Welcome to Luminal Systems!";
        $mail->Body = "
            <div style='font-family:Arial; padding:20px; max-width:600px'>
                <h2 style='color:#6366f1;'>Welcome to Luminal Systems!</h2>
                <hr style='border:1px solid #eee'>
                <p>Hi <b>{$name}</b>,</p>
                <p>Your account has been created successfully.</p>
                <p>You can now log in and manage your orders, track payments, and access exclusive features.</p>
                <br>
                <p><b>Your registered email:</b> {$email}</p>
                <br>
                <p>If you have any questions, feel free to reach out to our support team.</p>
                <br>
                <p>Best regards,</p>
                <p><b>The Luminal Systems Team</b></p>
            </div>
        ";
        $mail->AltBody = "Welcome to Luminal Systems, $name! Your account ($email) has been created successfully. You can now log in and manage your orders.";
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log('Mail failed (welcome): ' . $e->getMessage());
        return false;
    }
}

function sendOrderConfirmationEmail($orderData)
{
    try {
        $name = $orderData['first_name'] . ' ' . $orderData['last_name'];
        $mail = getMailer();
        $mail->addAddress($orderData['email'], $name);
        $mail->isHTML(true);
        $mail->Subject = "Order Confirmation - {$orderData['plan_name']} Plan";

        $amount = number_format($orderData['amount'], 2);
        $billing = $orderData['currency'] === 'yearly' ? 'Yearly' : 'Monthly';

        $mail->Body = "
            <div style='font-family:Arial; padding:20px; max-width:600px'>
                <h2 style='color:#6366f1;'>Payment Successful!</h2>
                <hr style='border:1px solid #eee'>
                <p>Hi <b>{$name}</b>,</p>
                <p>Thank you for your purchase! Your payment has been processed successfully.</p>
                <br>
                <table style='width:100%; border-collapse:collapse;'>
                    <tr><td style='padding:8px; color:#888;'>Order ID</td><td style='padding:8px; font-weight:bold;'>{$orderData['order_id']}</td></tr>
                    <tr><td style='padding:8px; color:#888;'>Plan</td><td style='padding:8px; font-weight:bold;'>{$orderData['plan_name']}</td></tr>
                    <tr><td style='padding:8px; color:#888;'>Billing</td><td style='padding:8px; font-weight:bold;'>{$billing}</td></tr>
                    <tr><td style='padding:8px; color:#888;'>Amount</td><td style='padding:8px; font-weight:bold; font-size:18px; color:#6366f1;'>\${$amount}</td></tr>
                    <tr><td style='padding:8px; color:#888;'>Email</td><td style='padding:8px;'>{$orderData['email']}</td></tr>
                    <tr><td style='padding:8px; color:#888;'>Status</td><td style='padding:8px; color:#22c55e; font-weight:bold;'>Completed</td></tr>
                </table>
                <br>
                <p>You can now access all features included in your {$orderData['plan_name']} plan.</p>
                <br>
                <p>Best regards,</p>
                <p><b>The Luminal Systems Team</b></p>
            </div>
        ";

        $mail->AltBody = "Payment Successful!\n\nOrder ID: {$orderData['order_id']}\nPlan: {$orderData['plan_name']}\nBilling: {$billing}\nAmount: \${$amount}\nStatus: Completed\n\nThank you for choosing Luminal Systems!";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log('Mail failed (order confirmation): ' . $e->getMessage());
        return false;
    }
}
