import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask, request, jsonify

app = Flask(__name__)

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
        print(f"Failed to send email: {e}")
        return str(e)

    return "Email sent successfully!"

@app.route('/send_email', methods=['POST'])
def handle_email_request():
    data = request.get_json()
    to_email = data.get('toEmail')
    subject = data.get('subject')
    message = data.get('message')

    if not to_email or not subject or not message:
        return jsonify({'error': 'Missing required fields'}), 400

    result = send_email(to_email, su
