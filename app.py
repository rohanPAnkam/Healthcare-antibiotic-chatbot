# import argparse
# # from langchain.vectorstores.chroma import Chroma
# from langchain_community.vectorstores import Chroma
# from langchain.prompts import ChatPromptTemplate
# from langchain_community.llms.ollama import Ollama
# # Use a pipeline as a high-level helper
# from transformers import pipeline

# # Load model directly
# from transformers import AutoTokenizer, AutoModelForCausalLM

# from get_embedding_function import get_embedding_function

# from transformers import AutoModel

# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# # Specify allowed origin (e.g., frontend running on localhost:3000)
# CORS(app, resources={r"/process": {"origins": "http://localhost:3000"}})

# CHROMA_PATH = "chroma"

# PROMPT_TEMPLATE = """
# Answer the question based only on the following context:

# {context}

# ---

# Answer the question based on the above context: {question}
# """


# # def main():
# #     # Create CLI.
# #     parser = argparse.ArgumentParser()
# #     parser.add_argument("query_text", type=str, help="The query text.")
# #     args = parser.parse_args()
# #     query_text = args.query_text
# #     query_rag(query_text)


# # Process route
# @app.route('/process', methods=['POST'])
# def process_text():
    
#     data = request.get_json()
#     input_text = data.get('text', '')
#     # Prepare the DB.
#     embedding_function = get_embedding_function()
#     db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

#     # Search the DB.
#     results = db.similarity_search_with_score(query_text, k=2)

#     context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
#     prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
#     prompt = prompt_template.format(context=context_text, question=query_text)
#     # print(prompt)


#     # Decode response
    

#     model = Ollama(model="phi")
#     response_text = model.invoke(prompt)
#     # print(response_text)

#     sources = [doc.metadata.get("id", None) for doc, _score in results]
#     formatted_response = f"Response: {response_text}\nSources: {sources}"
#     print(formatted_response)
    
#     return jsonify({
#         'modifiedText': response_text
#     })


# if __name__ == '__main__':
#     app.run(host='localhost', port=3005, debug=True)


#############################################DEEEPSEEEKKKKKKK

# import argparse
# from langchain_community.vectorstores import Chroma
# from langchain.prompts import ChatPromptTemplate
# from langchain_community.llms.ollama import Ollama
# from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM, AutoModel
# from get_embedding_function import get_embedding_function
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# # Specify allowed origin (e.g., frontend running on localhost:3000)
# CORS(app, resources={r"/process": {"origins": "http://localhost:3000"}})

# CHROMA_PATH = "chroma"

# PROMPT_TEMPLATE = """
# Answer the question based only on the following context:

# {context}

# ---

# Answer the question based on the above context: {question}
# """

# @app.route('/')
# def home():
#     return "Welcome to the Creative Chat Backend!"

# @app.route('/process', methods=['POST'])
# def process_text():
#     try:
#         # Get input from request
#         data = request.get_json()
#         input_text = data.get('text', '')
#         if not input_text:
#             return jsonify({'error': 'No text provided'}), 400

#         # Prepare the DB
#         embedding_function = get_embedding_function()
#         db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

#         # Search the DB with input_text (not query_text)
#         results = db.similarity_search_with_score(input_text, k=2)

#         # Format context from search results
#         context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
#         prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
#         prompt = prompt_template.format(context=context_text, question=input_text)

#         # Initialize Ollama model and get response
#         model = Ollama(model="deepseek-r1:1.5b")
#         response_text = model.invoke(prompt)

#         # Log sources for debugging
#         sources = [doc.metadata.get("id", None) for doc, _score in results]
#         formatted_response = f"Response: {response_text}\nSources: {sources}"
#         print(formatted_response)

#         return jsonify({
#             'modifiedText': response_text
#         })
#     except Exception as e:
#         print(f"Error processing request: {str(e)}")
#         return jsonify({'error': 'Internal server error'}), 500

# if __name__ == '__main__':
#     app.run(host='localhost', port=3005, debug=True)


# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# # Specify allowed origin (e.g., frontend running on localhost:3000)
# CORS(app, resources={r"/process": {"origins": "http://localhost:3000"}})

# # Root route
# @app.route('/')
# def home():
#     return "Welcome to the Creative Chat Backend!"

# # Process route
# @app.route('/process', methods=['POST'])
# def process_text():
#     data = request.get_json()
#     input_text = data.get('text', '')
    
#     embedding_function = get_embedding_function()
#     db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

#     # Search the DB.
#     results = db.similarity_search_with_score(query_text, k=2)

#     context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
#     prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
#     prompt = prompt_template.format(context=context_text, question=query_text)
#     # print(prompt)


#     # Decode response
    

#     model = Ollama(model="phi")
#     response_text = model.invoke(input_text)
#     # print(response_text)

#     sources = [doc.metadata.get("id", None) for doc, _score in results]
#     formatted_response = f"Response: {response_text}\nSources: {sources}"
#     print(formatted_response)

#     # Modify the input text (example: reverse it)
#     # modified_text = input_text[::-1]  # Reverse the text

#     return jsonify({
#         'modifiedText': response_text
#     })

# if __name__ == '__main__':
#     app.run(host='localhost', port=3005, debug=True)
    
    
    
    
    
# from flask import Flask, request, jsonify
# from langchain_community.vectorstores import Chroma
# from langchain.prompts import ChatPromptTemplate
# from langchain_community.llms.ollama import Ollama
# from get_embedding_function import get_embedding_function

# app = Flask(__name__)

# CHROMA_PATH = "chroma"
# PROMPT_TEMPLATE = """
# Answer the question based only on the following context:

# {context}

# ---

# Answer the question based on the above context: {question}
# """

# @app.route('/query', methods=['POST'])
# def query_rag():
#     query_text = request.json.get("query_text")
    
#     # Prepare the DB.
#     embedding_function = get_embedding_function()
#     db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

#     # Search the DB.
#     results = db.similarity_search_with_score(query_text, k=2)

#     context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
#     prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
#     prompt = prompt_template.format(context=context_text, question=query_text)

#     # Invoke the model
#     model = Ollama(model="phi")
#     response_text = model.invoke(prompt)

#     sources = [doc.metadata.get("id", None) for doc, _score in results]
#     formatted_response = f"Response: {response_text}\nSources: {sources}"

#     return jsonify({"response": formatted_response})

# if __name__ == '__main__':
#     app.run(host='localhost', port=3005, debug=True)

# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Root route
# @app.route('/')
# def home():
#     return "Welcome to the Creative Chat Backend!"

# # Process route
# @app.route('/process', methods=['POST'])
# def process_text():
#     data = request.get_json()
#     input_text = data.get('text', '')

#     # Modify the input text (example: reverse it)
#     modified_text = input_text[::-1]  # Reverse the text

#     return jsonify({
#         'modifiedText': modified_text
#     })

# if __name__ == '__main__':
#     app.run(host='localhost', port=3005, debug=True)



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from langchain.prompts import ChatPromptTemplate
# from langchain_community.llms import Ollama
# from chromadb import Chroma
# import traceback

# app = Flask(__name__)
# CORS(app, resources={r"/process": {"origins": "http://localhost:3000"}})

# # Constants (define these based on your setup)
# CHROMA_PATH = "path/to/your/chroma/db"  # Replace with actual path
# PROMPT_TEMPLATE = """
# Answer the question based on the following context:
# {context}

# Question: {question}
# """

# # Placeholder for embedding function (replace with your actual implementation)
# def get_embedding_function():
#     # Example: return a function from langchain.embeddings (e.g., OpenAIEmbeddings)
#     from langchain.embeddings import OpenAIEmbeddings  # Or another embedding model
#     return OpenAIEmbeddings()  # Requires an API key or local setup

# @app.route('/')
# def home():
#     return "Welcome to the Creative Chat Backend!"

# @app.route('/process', methods=['POST'])
# def process_text():
#     try:
#         data = request.get_json()
#         input_text = data.get('text', '')
#         if not input_text:
#             return jsonify({'error': 'No input text provided'}), 400

#         # Set up Chroma DB
#         embedding_function = get_embedding_function()
#         db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

#         # Search the DB with input_text as the query
#         results = db.similarity_search_with_score(input_text, k=2)

#         # Build context from search results
#         context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])

#         # Create and format the prompt
#         prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
#         prompt = prompt_template.format(context=context_text, question=input_text)

#         # Invoke the model with the formatted prompt
#         model = Ollama(model="phi")
#         response_text = model.invoke(prompt)  # Use prompt instead of input_text

#         # Gather sources
#         sources = [doc.metadata.get("id", None) for doc, _score in results]
#         formatted_response = f"Response: {response_text}\nSources: {sources}"
#         print(formatted_response)

#         return jsonify({
#             'modifiedText': response_text
#         })

#     except Exception as e:
#         print(f"Error: {str(e)}")
#         traceback.print_exc()
#         return jsonify({'error': 'Internal server error'}), 500

# if __name__ == '__main__':
#     app.run(host='localhost', port=3005, debug=True)


# import argparse
# from langchain_community.vectorstores import Chroma
# from langchain.prompts import ChatPromptTemplate
# from langchain_community.llms.ollama import Ollama
# from get_embedding_function import get_embedding_function
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import re  # For regex to remove <think> tags

# app = Flask(__name__)
# CORS(app, resources={r"/process": {"origins": "http://localhost:3000"}})

# CHROMA_PATH = "chroma"

# PROMPT_TEMPLATE = """
# Answer the question based only on the following context:

# {context}

# ---

# Answer the question based on the above context: {question}
# """

# @app.route('/')
# def home():
#     return "Welcome to the Creative Chat Backend!"

# @app.route('/process', methods=['POST'])
# def process_text():
#     try:
#         # Get input from request
#         data = request.get_json()
#         input_text = data.get('text', '')
#         if not input_text:
#             return jsonify({'error': 'No text provided'}), 400

#         # Prepare the DB
#         embedding_function = get_embedding_function()
#         db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

#         # Search the DB with input_text
#         results = db.similarity_search_with_score(input_text, k=2)

#         # Format context from search results
#         context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
#         prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
#         prompt = prompt_template.format(context=context_text, question=input_text)

#         # Initialize Ollama model and get response
#         model = Ollama(model="deepseek-r1:1.5b")  # Assuming "phi" is your DeepSeek-R1:1.5b alias
#         response_text = model.invoke(prompt)

#         # Remove <think> and </think> tags and their contents
#         cleaned_response = re.sub(r'<think>.*?</think>', '', response_text, flags=re.DOTALL).strip()

#         # Log sources for debugging
#         sources = [doc.metadata.get("id", None) for doc, _score in results]
#         formatted_response = f"Response: {cleaned_response}\nSources: {sources}"
#         print(formatted_response)

#         return jsonify({
#             'modifiedText': cleaned_response
#         })
#     except Exception as e:
#         print(f"Error processing request: {str(e)}")
#         return jsonify({'error': 'Internal server error'}), 500

# if __name__ == '__main__':
#     app.run(host='localhost', port=3005, debug=True)


import argparse
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
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
        results = db.similarity_search_with_score(input_text, k=2)

        # Format context from search results
        context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
        prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
        prompt = prompt_template.format(context=context_text, question=input_text)

        # Initialize Ollama model and get response
        # model = Ollama(model="phi")
        model = Ollama(model="deepseek-r1:1.5b")
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