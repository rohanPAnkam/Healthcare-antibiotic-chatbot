import streamlit as st
from app import query_rag  # Import the query_rag function from your main script

# Set up the Streamlit app
st.title("RAG Query Interface")
st.write("Enter your query below and get answers based on the context from the database.")

# Input field for the user query
user_query = st.text_input("Enter your query:")

if user_query:
    # Call the query_rag function with the user's query
    response = query_rag(user_query)
    
    # Display the response
    st.subheader("Response:")
    st.write(response)