import argparse
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
from pydantic import BaseModel
from get_embedding_function import get_embedding_function
from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app, resources={r"/process": {"origins": "http://localhost:3000"}})

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}

Provide the answer as a list of bullet points starting with "- " and avoid using numbered points or bold Markdown syntax (e.g., **text**).
"""

@app.route('/')
def home():
    return "Welcome to the Creative Chat Backend!"

@app.route('/process', methods=['POST'])
def process_text():
    try:
        # Get input from request
        data = request.get_json()
        input_text = data.get('text', '')
        if not input_text:
            return jsonify({'error': 'No text provided'}), 400

        # Prepare the DB
        embedding_function = get_embedding_function()
        db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

        # Search the DB with input_text
        results = db.similarity_search_with_score(input_text, k=5)

        # Format context from search results
        context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
        prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
        prompt = prompt_template.format(context=context_text, question=input_text)

        # Initialize Ollama model and get response
        # model = Ollama(model="phi")
        # model = Ollama(model="deepseek-r1:1.5b")
        model = Ollama(model="gemma2:2b")
        response_text = model.invoke(prompt)

        # Remove <think> and </think> tags and their contents
        response_text = re.sub(r'<think>.*?</think>', '', response_text, flags=re.DOTALL).strip()

        # Convert numbered bold points (e.g., "1. **Porins**:") to plain bullet points (e.g., "- Porins:")
        cleaned_response = re.sub(r'(\d+\.\s*)\*\*(.*?)\*\*:\s*', r'- \2: ', response_text)

        # Ensure consistent bullet points (replace any remaining numbered lines without bold)
        cleaned_response = re.sub(r'(\d+\.\s*)(.*?)$', r'- \2', cleaned_response, flags=re.MULTILINE)

        # Log sources for debugging
        sources = [doc.metadata.get("id", None) for doc, _score in results]
        formatted_response = f"Response: {cleaned_response}\nSources: {sources}"
        print(formatted_response)

        return jsonify({
            'modifiedText': cleaned_response
        })
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=3005, debug=True)