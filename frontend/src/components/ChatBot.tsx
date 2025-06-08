import axios from "axios";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { from: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput(""); // Clear input after sending

  try {
    axios.post("http://localhost:8000/chat", { message: input })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.reply);

        const botMessage = { from: "bot", text: res.data.reply };
        setMessages((prev) => [...prev, botMessage]);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="w-96 h-[32rem] bg-white border shadow-xl rounded-xl flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white flex items-center justify-between p-4">
            <span className="text-lg font-semibold">Assistant</span>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto text-gray-700 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  msg.from === "user" ? "bg-blue-100 self-end text-right" : "bg-gray-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
