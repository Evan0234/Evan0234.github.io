import os
import requests
import sys
import json


RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY')
TESTMAIL_API_KEY = os.getenv('TESTMAIL_API_KEY')
SENDER_EMAIL = "esamu.noreply@inbox.testmail.app"

def verify_recaptcha(recaptcha_response):
    url = "https://www.google.com/recaptcha/api/siteverify"
    payload = {
        'secret': RECAPTCHA_SECRET_KEY,
        'response': recaptcha_response
    }
    response = requests.post(url, data=payload)
    result = response.json()
    return result.get('success')

def send_test_email(to_email):
    url = "https://api.testmail.app/api/send"
    headers = {
        'Authorization': f'Bearer {TESTMAIL_API_KEY}',
        'Content-Type': 'application/json'
    }
    data = {
        'from': SENDER_EMAIL,
        'to': to_email,
        'subject': '😁',
        'text': 'congrats you got the email 😊 🥳'
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        print('Email sent successfully!')
    else:
        print('Failed to send email.')
        print(response.text)

def main():
    if len(sys.argv) != 2:
        print("Usage: python send_email.py <email>")
        sys.exit(1)

    email = sys.argv[1]
    recaptcha_response = os.getenv('RECAPTCHA_RESPONSE')
    
    if not verify_recaptcha(recaptcha_response):
        print("reCAPTCHA verification failed.")
        sys.exit(1)
    
    send_test_email(email)

if __name__ == "__main__":
    main()
