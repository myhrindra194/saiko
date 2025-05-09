import { HandRaisedIcon, MicrophoneIcon } from "@heroicons/react/16/solid";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Format audio config
  const AUDIO_TYPE = "audio/mp3";
  const AUDIO_EXTENSION = "mp3";

  // Text API
  const fetchBotResponse = async (userMessage) => {
    setIsLoading(true);
    try {
      const encodedInput = encodeURIComponent(userMessage);
      const response = await fetch(
        `https://saiko-ai-kr5w.onrender.com/chatbot/?input=${encodedInput}`,
        {
          method: "POST",
          headers: { accept: "application/json" },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return "Sorry, I'm having trouble responding right now. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  // Voice API
  const fetchBotVoiceResponse = async (audioBlob) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("input", audioBlob, `recording.${AUDIO_EXTENSION}`);

      const response = await fetch(
        "https://saiko-ai-kr5w.onrender.com/botvocal/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }

      const audioBlobResponse = await response.blob();
      return URL.createObjectURL(audioBlobResponse);
    } catch (error) {
      console.error("Error fetching bot voice response:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Audio recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: AUDIO_TYPE,
        });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Add user voice message
        const userMessage = {
          id: Date.now(),
          audioUrl,
          sender: "user",
          isAudio: true,
        };
        setMessages((prev) => [...prev, userMessage]);

        // Get bot voice response
        const botAudioUrl = await fetchBotVoiceResponse(audioBlob);
        if (botAudioUrl) {
          const botMessage = {
            id: Date.now() + 1,
            audioUrl: botAudioUrl,
            sender: "bot",
            isAudio: true,
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          // Fallback to text response
          const botMessage = {
            id: Date.now() + 1,
            text: "I received your voice message but couldn't generate a voice response.",
            sender: "bot",
          };
          setMessages((prev) => [...prev, botMessage]);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current?.stop();
      mediaRecorderRef.current?.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording();
  };

  // Text message handler
  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const botResponse = await fetchBotResponse(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in handleSend:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I couldn't process your message. Please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Audio playback
  const playAudio = (url) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    audioRef.current = new Audio(url);
    audioRef.current.play();
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopRecording();
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Clean up object URLs
      messages.forEach((msg) => {
        if (msg.isAudio && msg.audioUrl) {
          URL.revokeObjectURL(msg.audioUrl);
        }
      });
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-0 flex flex-col pt-20 ">
      {/* Header */}
      <div className="sticky top-2 z-10 backdrop-blur-2xl pt-6 pb-3 px-4 text-center">
        <div className="flex items-center justify-center space-x-2 flex-col">
          <HandRaisedIcon className="size-10 text-purple-500 dark:text-purple-400 rotate-12 mb-3" />
          <h3 className="text-2xl text-slate-800 dark:text-slate-200 mb-2">
            Mental Health Companion
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Speak or type your message
          </p>
        </div>
      </div>

      {/* Messages */}
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
                  {msg.isAudio ? (
                    <button
                      onClick={() => playAudio(msg.audioUrl)}
                      className="flex items-center justify-center p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
                        />
                      </svg>
                      <span className="ml-2">
                        {msg.sender === "user" ? "My message" : "Play response"}
                      </span>
                    </button>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-none dark:bg-slate-700 dark:text-slate-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="sticky bottom-0 p-4 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="w-full relative">
            <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded-full px-4 w-full focus-within:ring focus-within:ring-purple-500 focus-within:bg-slate-100 dark:focus-within:bg-slate-600">
              <button
                type="button"
                onClick={toggleRecording}
                className={`p-2 mr-2 rounded-full ${
                  isRecording
                    ? "animate-pulse bg-red-500 text-white"
                    : "text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
                }`}
                disabled={isLoading}
              >
                <MicrophoneIcon className="w-5 h-5" />
              </button>
              <input
                type="text"
                name="bot"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  isRecording ? "Recording audio..." : "Type your message..."
                }
                className="flex-1 bg-transparent py-4 outline-none placeholder-slate-400 dark:placeholder-slate-400 text-slate-800 dark:text-slate-200"
                disabled={isLoading || isRecording}
              />
              <button
                type="submit"
                className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 p-2"
                disabled={isLoading || isRecording || !inputValue.trim()}
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
            {isRecording && (
              <div className="absolute -top-8 left-0 right-0 text-center">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                  Recording... Click to stop
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
