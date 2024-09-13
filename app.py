import google.generativeai as genai
from flask import Flask, Response, request
from base64 import b64encode, b64decode
import binascii
import json

API_KEY: str = ""
DEBUG: bool = True

# Configuration
genai.configure(api_key=API_KEY)
generation_config: dict = {"temperature": 0.5, "top_p": 0.8, "top_k": 20, "max_output_tokens": 2048}

# Initialize Model
model = genai.GenerativeModel("gemini-pro", generation_config=generation_config)

# Configure Flask
app: Flask = Flask(__name__)

# Define Endpoints
@app.get("/")
def home():
    with open("./home.html", "r", encoding="utf-8") as file:
        content: str = file.read().strip()

    return Response(content, 200, content_type="text/html")

@app.get("/quiz")
def quiz():
    topic_encoded: str = request.args.get("topic")
    difficulty: str = request.args.get("difficulty")
    question_count: str = request.args.get("count")

    if topic_encoded is None or topic_encoded.strip() == "": return Response("No topic provided.")
    topic_encoded = topic_encoded.strip()

    try: topic: str = b64decode(topic_encoded).decode("utf-8")
    except binascii.Error: return Response("Invalid topic token.")

    with open("./index.html", "r", encoding="utf-8") as file: content: str = file.read().strip()
    with open("./prompt.txt", "r", encoding="utf-8") as file: prompt: str = file.read().strip()

    prompt = prompt.replace("{{QCOUNT}}", question_count)
    prompt = prompt.replace("{{TOPIC}}", topic)
    prompt = prompt.replace("{{DIFFICULTY}}", difficulty)

    response: str = model.generate_content([prompt]).text
    response_encoded: str = b64encode(response.encode("utf-8")).decode("utf-8")

    try: response_json: dict = json.loads(response)
    except: response_json: dict = {}

    content: str = content.replace("{{ENCODED_DATA}}", response_encoded)
    content: str = content.replace("{{TOPIC}}", response_json.get("topic", ""))
    content: str = content.replace("{{DIFFICULTY}}", response_json.get("difficulty", ""))

    return Response(content, 200, content_type="text/html")

# Run App
app.run("0.0.0.0", 80, debug=DEBUG)
