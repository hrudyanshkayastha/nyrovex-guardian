from dotenv import load_dotenv
import os

load_dotenv()

print("AIML_API_KEY found:", bool(os.getenv("AIML_API_KEY")))
