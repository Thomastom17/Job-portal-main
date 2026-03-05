import React, { useState, useEffect, useRef } from "react";
import "./Chatbox.css";
import { Header } from "../Components-LandingPage/Header";
import { useJobs } from "../JobContext";

export const Chatbox = () => {
  const { 
    chats, 
    setChats, 
    isChatEnded, 
    setIsChatEnded, 
    addNotification, 
    addEmployerNotification 
  } = useJobs();

  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  
  // ✅ Puthu messages-ah track panna indha Ref mukkiyam
  const notifiedMessageIds = useRef(new Set());

  const jobseekerChat = chats.find(c => c.role === "jobseeker");
  const employerData = chats.find(c => c.role === "employer");

  // --- RECEIVE MESSAGE NOTIFICATION LOGIC (FIXED) ---
  useEffect(() => {
    const messages = employerData?.messages || [];
    
    messages.forEach((msg) => {
      // 1. Message sender Employer ('friend') illama irukanum
      // 2. Indha message-ku idhuku munnadi notification anupi iruka koodadhu
      if (msg.sender !== "friend" && !notifiedMessageIds.current.has(msg.id)) {
        
        addEmployerNotification(`New message from ${jobseekerChat?.name || 'Jobseeker'}: ${msg.text}`);
        
        // 3. Indha ID-ya save panniko, so thirumba notify aagadhu
        notifiedMessageIds.current.add(msg.id);
      }
    });
  }, [employerData?.messages, addEmployerNotification, jobseekerChat?.name]); 

  // Auto scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [employerData?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isChatEnded) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgId = Date.now();

    const employerReply = {
      id: msgId,
      text: input,
      sender: "friend", 
      time: currentTime
    };

    // Employer anupura message-aiyum notified list-la add pannidu, appo dhaan adhu notify aagadhu
    notifiedMessageIds.current.add(msgId);

    setChats(prev => prev.map(chat => 
      chat.role === "employer" ? { ...chat, messages: [...chat.messages, employerReply] } : chat
    ));

    addNotification(`New message from Employer: ${input}`);
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
                <strong>{jobseekerChat?.name || "Jobseeker"}</strong>
              </div>
            </div>
          </div>

          <div className="web-main-chat">
            <header className="web-chat-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>{jobseekerChat?.name || "Jobseeker"}</strong>
              <button 
                onClick={() => setIsChatEnded(!isChatEnded)}
                className={isChatEnded ? "E-Start-Convo-Button" : "E-End-Convo-Button"}
              >
                {isChatEnded ? "RESTART" : "END CONVERSATION"}
              </button>
            </header>

            <div className="web-chat-window" ref={scrollRef}>
              {employerData?.messages.map((m) => (
                <div key={m.id} className="web-msg-row">
                  <div className={`web-bubble ${m.sender === 'friend' ? 'web-me' : 'web-friend'}`}>
                    {m.text}
                    <div style={{ fontSize: '10px', marginTop: '5px', opacity: 0.7 }}>{m.time}</div>
                  </div>
                </div>
              ))}
              {isChatEnded && (
                <div style={{ textAlign: "center", padding: "10px", color: "gray", fontSize: "12px" }}>
                  --- Conversation Ended ---
                </div>
              )}
            </div>

            <form className="web-input-bar" onSubmit={handleSend}>
              <input 
                className="web-text-input" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                disabled={isChatEnded}
                placeholder={isChatEnded ? "Restart to type..." : "Type a message..."}
              />
              <button type="submit" className="web-send-button" disabled={isChatEnded || !input.trim()}>
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};