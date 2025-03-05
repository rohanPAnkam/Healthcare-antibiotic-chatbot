"use client";
import withAuth from "@/components/withAuth";
import React from "react";
import ChatInterface from "@/components/chat-interface";

const ChatPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ChatInterface />
    </div>
  );
};

export default withAuth(ChatPage);
