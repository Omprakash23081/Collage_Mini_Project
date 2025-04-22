import requests

url = "https://glbg.servergi.com:8072/SIMWEBGLB/Login"
payload = {
    'username': 'yourUser ID',
    'password': 'yourPassword'
}
headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User -Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    # Add other headers as needed
}

response = requests.post(url, data=payload, headers=headers)

print(response.text)  # This will print the response from the server