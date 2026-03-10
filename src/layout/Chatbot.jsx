import { HandRaisedIcon } from "@heroicons/react/16/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

import { sendToChatbot } from "../services/chatService";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour, Je suis votre assistant virtuel, prêt à vous aider avec vos questions sur la santé mentale. N'hésitez pas à me poser vos questions !",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

 const handleSend = async (e) => {
  e.preventDefault();
  if (!inputValue.trim() || isTyping) return;

  const userMessage = {
    id: Date.now(),
    text: inputValue,
    sender: "user",
  };

  setMessages((prev) => [...prev, userMessage]);
  const currentInput = inputValue; 
  setInputValue("");
  setIsTyping(true);

  try {
    const data = await sendToChatbot(currentInput);
    
    const botMessage = {
      id: Date.now() + 1,
      text: data.text,
      sender: "bot",
    };
    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    setMessages((prev) => [...prev, {
      id: Date.now() + 1,
      text: "Désolé, je rencontre une difficulté technique. Réessayez plus tard.",
      sender: "bot"
    }]);
    throw error;
  } finally {
    setIsTyping(false);
  }
};
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-0 flex flex-col pt-20">
      <div className="sticky top-2 z-10 backdrop-blur-2xl pt-6 pb-3 px-4 text-center">
        <div className="flex items-center justify-center space-x-2 flex-col">
          <HandRaisedIcon className="size-10 text-purple-500 dark:text-purple-400 rotate-12 mb-3" />
          <h3 className="text-2xl text-slate-800 dark:text-slate-200 mb-2">
            Comment puis-je vous aider aujourd&apos;hui ?
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Prêt à vous aider avec n&apos;importe quoi vous avez besoin de répondre aux questions
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-5">
        <div className="max-w-3xl mx-auto py-4 px-4">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-purple-500 text-white rounded-br-none"
                      : "bg-slate-200 text-slate-800 rounded-bl-none dark:bg-slate-700 dark:text-slate-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-slate-200 dark:bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-none flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-slate-500 dark:bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-500 dark:bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-500 dark:bg-slate-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0  p-4 ">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="w-full">
            <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded-full px-4 w-full focus-within:ring focus-within:ring-purple-500 focus-within:bg-slate-100 dark:focus-within:bg-slate-600">
              <input
                type="text"
                name="bot"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="How are you feeling today?"
                className="flex-1 bg-transparent py-4 outline-none placeholder-slate-400 dark:placeholder-slate-400 text-slate-800 dark:text-slate-200"
              />
              <button
                type="submit"
                className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 p-2"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
