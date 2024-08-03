import requests
import sys
import os

def send_email(recipient_email):
    
    api_key = os.getenv('TESTMAIL_API_KEY')
    

    sender_email = "noreply@example.com"
    subject = "Test Email"
    body = "This is a test email sent using Testmail.app API."

    
    api_endpoint = "https://api.testmail.app/send"

    
    payload = {
        'from': sender_email,
        'to': recipient_email,
        'subject': subject,
        'text': body
    }

    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }

    try:
        
        response = requests.post(api_endpoint, json=payload, headers=headers)
        response.raise_for_status()  
        print("Email sent successfully.")
    except Exception as e:
        print(f"Failed to send email. Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python send_email.py <recipient_email>")
        sys.exit(1)

    recipient_email = sys.argv[1]
    send_email(recipient_email)
