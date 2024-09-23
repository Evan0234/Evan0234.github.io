<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // Prepare the email
    $to = 'support@zeeps.me'; // Your support email address
    $subject = 'New Support Ticket';
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: noreply@zeeps.me\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Send confirmation email to user
        $confirmation_subject = 'Support Ticket Received';
        $confirmation_body = "Hi $name,\n\nThank you for contacting Zeeps Support!\n\nWe have received your support ticket, and our team is currently reviewing your request. Your satisfaction is our priority, and we appreciate your patience as we work to assist you.\n\nBest regards,\nThe Zeeps Support Team\nnoreply@zeeps.me";
        
        mail($email, $confirmation_subject, $confirmation_body, "From: noreply@zeeps.me");
        
        // Send a success response back to AJAX
        echo "Thank you for your message! We will get back to you soon.";
    } else {
        echo "There was a problem sending your message. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
