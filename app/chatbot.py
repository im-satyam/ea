import os
import requests

API_KEY = os.getenv("OPENROUTER_API_KEY")

def get_api_response(message):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "openai/gpt-3.5-turbo",  # or try mistralai/mistral-7b-instruct
        "messages": [{"role": "user", "content": message}]
    }

    try:
        res = requests.post(url, json=data, headers=headers)
        if res.status_code == 200:
            return res.json()["choices"][0]["message"]["content"]
        else:
            return f"Error {res.status_code}: {res.text}"
    except Exception as e:
        return f"Exception: {str(e)}"
