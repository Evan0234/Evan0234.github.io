import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import sys

def send_email(to_email, subject, message):
    from_email = os.getenv('ZOHO_EMAIL')
    password = os.getenv('ZOHO_PASSWORD')

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

    except Exception as e:
        return f"Error: {str(e)}"

    return "Email sent successfully!"

if __name__ == "__main__":
    email = sys.argv[1]
    subject = "👍"
    message = "u got the email 😊 👍"
    result = send_email(email, subject, message)
    print(result)
