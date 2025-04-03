import { HandRaisedIcon } from "@heroicons/react/16/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, I'm your mental health companion. How are you feeling today?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const getBotResponse = (userMessage) => {
    const responses = {
      hello: "I'm here to listen. How has your day been?",
      anxious:
        "Try the 5-4-3-2-1 technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
      sad: "Your feelings are valid. Would you like to share more?",
      stress:
        "Break things into smaller steps. What's one small thing that might help?",
      sleep:
        "Try 4-4-6 breathing: Inhale 4s, hold 4s, exhale 6s. Repeat 5 times.",
    };
    return (
      responses[userMessage.toLowerCase()] ||
      "I'm listening. Could you tell me more?"
    );
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1200);
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
            How can I help you today?
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Ready to assist you on anything you need from answering questions
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
