from flask import Flask, request, jsonify
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    email = data.get('email')
    
    from_email = os.getenv('ZOHO_EMAIL')
    password = os.getenv('ZOHO_PASSWORD')
    
    if not email:
        return jsonify({'error': 'No email provided'}), 400
    
    if not from_email or not password:
        return jsonify({'error': 'Email or password not set in environment variables'}), 500

    try:
        server = smtplib.SMTP('smtp.zoho.com', 587)
        server.starttls()
        server.login(from_email, password)
        
        msg = MIMEMultipart()
        msg['From'] = from_email
        msg['To'] = email
        msg['Subject'] = 'Test Email from Zoho'
        msg.attach(MIMEText('u got the email 😊 👍', 'plain'))
        
        server.send_message(msg)
        server.quit()
        
        return jsonify({'message': 'Email sent successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
