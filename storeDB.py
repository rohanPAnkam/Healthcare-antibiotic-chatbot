# import argparse
# import os
# import shutil
# from langchain_community.document_loaders import PyPDFDirectoryLoader
# from langchain_text_splitters import RecursiveCharacterTextSplitter
# from langchain.schema.document import Document
# from get_embedding_function import get_embedding_function
# from langchain_chroma import Chroma
# from pdf2image import convert_from_path

# CHROMA_PATH = "chroma"
# DATA_PATH = "data"
# IMG_DIR = "images"

# def main():
#     parser = argparse.ArgumentParser()
#     parser.add_argument("--reset", action="store_true", help="Reset the database.")
#     args = parser.parse_args()
#     if args.reset:
#         print("✨ Clearing Database")
#         clear_database()

#     documents = load_documents()
#     chunks = split_documents(documents)
#     add_to_chroma(chunks)

# def load_documents():
#     document_loader = PyPDFDirectoryLoader(DATA_PATH)
#     return document_loader.load()

# def split_documents(documents: list[Document]):
#     text_splitter = RecursiveCharacterTextSplitter(
#         chunk_size=800,
#         chunk_overlap=80,
#         length_function=len,
#         is_separator_regex=False,
#     )
#     return text_splitter.split_documents(documents)

# def add_to_chroma(chunks: list[Document]):
#     # Load the existing database (if it exists).
#     db = Chroma(
#         persist_directory=CHROMA_PATH,
#         embedding_function=get_embedding_function()
#     )

#     # Calculate chunk IDs.
#     chunks_with_ids = calculate_chunk_ids(chunks)

#     # Get existing items from the database.
#     existing_items = db.get(include=[])  # IDs are always included by default
#     existing_ids = set(existing_items["ids"])
#     print(f"Number of existing documents in DB: {len(existing_ids)}")

#     # Filter out chunks that don’t already exist in the DB.
#     new_chunks = [chunk for chunk in chunks_with_ids if chunk.metadata["id"] not in existing_ids]

#     if new_chunks:
#         print(f"👉 Adding new documents: {len(new_chunks)}")
#         new_chunk_ids = [chunk.metadata["id"] for chunk in new_chunks]
#         db.add_documents(documents=new_chunks, ids=new_chunk_ids)
#     else:
#         print("No new documents to add")

# def calculate_chunk_ids(chunks):
#     last_page_id = None
#     current_chunk_index = 0

#     for chunk in chunks:
#         source = chunk.metadata.get("source")
#         page = chunk.metadata.get("page")
#         current_page_id = f"{source}:{page}"
        
#         if current_page_id == last_page_id:
#             current_chunk_index += 1
#         else:
#             current_chunk_index = 0
        
#         chunk_id = f"{current_page_id}:{current_chunk_index}"
#         last_page_id = current_page_id

#         chunk.metadata["id"] = chunk_id

#     return chunks

# def clear_database():
#     if os.path.exists(CHROMA_PATH):
#         shutil.rmtree(CHROMA_PATH)

# if __name__ == "__main__":
#     main()

import argparse
import os
import shutil
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema.document import Document
from langchain_chroma import Chroma
from get_embedding_function import get_embedding_function

CHROMA_PATH = "chroma"
DATA_PATH = "data"

# Define the maximum batch size for Chroma
MAX_BATCH_SIZE = 5461

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset", action="store_true", help="Reset the database.")
    args = parser.parse_args()
    if args.reset:
        print("✨ Clearing Database")
        clear_database()

    documents = load_documents()
    chunks = split_documents(documents)
    add_to_chroma(chunks)

def load_documents():
    documents = []
    # Iterate through all .txt files in the DATA_PATH directory
    for filename in os.listdir(DATA_PATH):
        if filename.endswith(".txt"):
            file_path = os.path.join(DATA_PATH, filename)
            loader = TextLoader(file_path)
            documents.extend(loader.load())
    return documents

def split_documents(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=80,
        length_function=len,
        is_separator_regex=False,
    )
    return text_splitter.split_documents(documents)

def add_to_chroma(chunks: list[Document]):
    # Load the existing database (if it exists).
    db = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=get_embedding_function()
    )

    # Calculate chunk IDs.
    chunks_with_ids = calculate_chunk_ids(chunks)

    # Get existing items from the database.
    existing_items = db.get(include=[])  # IDs are always included by default
    existing_ids = set(existing_items["ids"])
    print(f"Number of existing documents in DB: {len(existing_ids)}")

    # Filter out chunks that don’t already exist in the DB.
    new_chunks = [chunk for chunk in chunks_with_ids if chunk.metadata["id"] not in existing_ids]

    if new_chunks:
        print(f"👉 Adding new documents: {len(new_chunks)}")
        # Process new_chunks in batches
        for i in range(0, len(new_chunks), MAX_BATCH_SIZE):
            batch = new_chunks[i:i + MAX_BATCH_SIZE]
            batch_ids = [chunk.metadata["id"] for chunk in batch]
            print(f"Adding batch of {len(batch)} documents...")
            db.add_documents(documents=batch, ids=batch_ids)
        print("All batches added successfully!")
    else:
        print("No new documents to add")

def calculate_chunk_ids(chunks):
    current_chunk_index = 0
    last_source = None

    for chunk in chunks:
        source = chunk.metadata.get("source")
        
        # Reset chunk index when source changes
        if source != last_source:
            current_chunk_index = 0
        else:
            current_chunk_index += 1
        
        # Create a unique chunk ID using source and chunk index
        chunk_id = f"{source}:{current_chunk_index}"
        last_source = source

        chunk.metadata["id"] = chunk_id

    return chunks

def clear_database():
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)

if __name__ == "__main__":
    main()