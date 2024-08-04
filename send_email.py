import os
import requests
import sys


recipient_email = sys.argv[1]


api_key = os.getenv('TESTMAIL_API_KEY')
from_email = 'esamu.noreply@inbox.testmail.app'
subject = '😁'
message = 'congrats you got the email 😊 🥳'


api_url = 'https://api.testmail.app/send'


headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json',
}

payload = {
    'from': from_email,
    'to': recipient_email,
    'subject': subject,
    'text': message,
}


response = requests.post(api_url, headers=headers, json=payload)


if response.status_code == 200:
    print('Email sent successfully!')
else:
    print(f'Failed to send email. Status code: {response.status_code}, Response: {response.text}')
