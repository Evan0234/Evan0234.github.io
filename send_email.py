import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_email(to_email, subject, message):
    from_email = os.getenv('ZOHO_EMAIL')
    password = os.getenv('ZOHO_PASSWORD')
    
    print(f"From Email: {from_email}")
    print(f"Password: {'*' * len(password) if password else None}")
    
    if not from_email or not password:
        raise ValueError("Email or password not set in environment variables")
    
    try:
        
        server = smtplib.SMTP('smtp.zoho.com', 587)
        server.starttls()
        
        
        server.login(from_email, password)
        
        
        msg = MIMEMultipart()
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = subject
        
        
        msg.attach(MIMEText(message, 'plain'))
        
        
        server.send_message(msg)
        
        
        server.quit()
        
        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")


if __name__ == "__main__":
    to_email = 'recipient_email@example.com'
    subject = 'Test Email from Zoho'
    message = 'This is a test email from my bot using Zoho.'

    send_email(to_email, subject, message)
