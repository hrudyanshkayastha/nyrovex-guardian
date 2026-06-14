from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url="https://api.aimlapi.com/v1",
    api_key=os.getenv("AIML_API_KEY"),
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": "Reply with: Nyrovex Guardian Online"
        }
    ]
)

print(response.choices[0].message.content)
