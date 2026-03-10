import React, { useState, useEffect, useRef } from "react";
import "./Chatbox.css";
import { Header } from "../Components-LandingPage/Header";
import { useJobs } from "../JobContext";

export const Chatbox = () => {
  const { chats, setChats } = useJobs();
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  
  const jobseekerChat = chats.find(c => c.role === "jobseeker");
  
  const employerData = chats.find(c => c.role === "employer");

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [employerData.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    
    const employerReply = {
      id: Date.now(),
      text: input,
      sender: "friend", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };  

  
    setChats(prev => prev.map(chat => 
      chat.role === "employer" ? { ...chat, messages: [...chat.messages, employerReply] } : chat
    ));

    setInput("");
  };

  return (
    <>
      <Header />
      <div className="messages-container">
        <div className="EChat-Mainsec">
            <div className="E-chat-name">
                <div style={{ height: "100vh" }} className="web-sidebar">
                    <div className="sidebar-item active">
                        <strong>{jobseekerChat.name}</strong>
                    </div>
                </div>
            </div>
            <div className="web-main-chat">
                <header className="web-chat-header">
                    <strong>{jobseekerChat.name}</strong>
                </header>
                <div className="web-chat-window" ref={scrollRef}>
                  {employerData.messages.map((m) => (
                    <div key={m.id} className="web-msg-row">
                      {/* Employer logic: friend is 'me' (Right), me is 'friend' (Left) */}
                      <div className={`web-bubble ${m.sender === 'friend' ? 'web-me' : 'web-friend'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
                <form className="web-input-bar" onSubmit={handleSend}>
                  <input className="web-text-input" value={input} onChange={(e) => setInput(e.target.value)} />
                  <button type="submit" className="web-send-button">SEND</button>
                </form>
            </div>
        </div>
      </div>
    </>
  );
};