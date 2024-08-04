import requests
import sys
import os

def send_email(recipient):

    api_key = os.getenv('TESTMAIL_API_KEY')

    if not api_key:
        raise ValueError("API key is missing")


    sender = 'noreply@zeeps.me'
    subject = '😊 '
    body = 'you got the email 😊 👍 '

    
    url = 'https://api.testmail.app/send'

    
    payload = {
        'from': sender,
        'to': recipient,
        'subject': subject,
        'text': body
    }

    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }

    
    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        print("Email sent successfully.")
    else:
        print(f"Failed to send email. Status code: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python send_email.py <recipient_email>")
        sys.exit(1)

    recipient_email = sys.argv[1]
    send_email(recipient_email)
