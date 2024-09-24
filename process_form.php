<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include PHPMailer classes
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load environment variables
$zohoPassword = getenv('ZOHO_PASSWORD');

// Initialize response message
$responseMessage = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize user inputs
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host = 'smtp.zoho.com'; // Your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'support@zeeps.me'; // Your email
        $mail->Password = $zohoPassword; // Use the environment variable for the password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
        $mail->Port = 587; // TCP port to connect to

        // Recipients
        $mail->setFrom('support@zeeps.me', 'Zeeps Support'); // Send from support address
        $mail->addAddress('support@zeeps.me'); // Add your support email
        $mail->addReplyTo($email, $name); // Set reply-to address to user email

        // Content
        $mail->isHTML(false); // Set email format to plain text
        $mail->Subject = 'New Support Ticket';
        $mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        // Send the email to the support team
        if (!$mail->send()) {
            $responseMessage = "Mailer Error: " . $mail->ErrorInfo;
        } else {
            // Confirmation email to the user
            $confirmation_subject = 'Support Ticket Received';
            $confirmation_body = "Hi $name,\n\nThank you for contacting Zeeps Support!\n\nWe have received your support ticket and our team is currently reviewing your request. Your satisfaction is our priority, and we appreciate your patience as we work to assist you.\n\nBest regards,\nThe Zeeps Support Team\nsupport@zeeps.me";

            // Clear previous recipients and send confirmation
            $mail->clearAddresses(); // Clear previous recipients
            $mail->addAddress($email); // Add the user email for confirmation
            $mail->Subject = $confirmation_subject;
            $mail->Body = $confirmation_body;

            // Send the confirmation email
            if (!$mail->send()) {
                $responseMessage = "Confirmation Email Error: " . $mail->ErrorInfo;
            } else {
                $responseMessage = "Thank you for your message! We will get back to you soon.";
            }
        }
    } catch (Exception $e) {
        $responseMessage = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    $responseMessage = "Invalid request.";
}

// Display the response message
echo "<html lang='en'>
<head><title>Form Submission Response</title></head>
<body>
<h1>$responseMessage</h1>
<a href='support.html'>Go back</a>
</body>
</html>";
