import requests

URL = 'http://localhost:8000/api/status/'

response = requests.get(url=URL)
print(response.content)
