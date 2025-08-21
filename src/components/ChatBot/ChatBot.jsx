import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleChatbot } from "../../redux/chatBotSlice/chatBotSlice";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      hitRequest();
    }
  };

  const isOpen = useSelector((state) => state.chatbot.isOpen);

  const hitRequest = async () => {
    if (message.trim()) {
      setIsSending(true); // Set sending state to true

      // Append user's message
      const userMessage = { type: "userMsg", text: message };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage("");

      try {
        // Initialize Google Generative AI
        const genAI = new GoogleGenerativeAI(
          "AIzaSyDxuBSkdQJeCPpHfLI-xD6rXxB-W8Fdxpo"
        ); // Replace with your actual API key
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        setIsSending(false); // Sending is done
        setIsReceiving(true); // Receiving is now in progress

        // Custom instructions to guide the AI's response
        const customInstructions = `
          You are an expert in Fintech and chat bot of company ezyfiling. Please provide detailed, accurate, and informative responses strictly in the context of Fintech, and all kind of financial things like ITR filing, GST filing and so on. 
          Follow these guidelines:
          1. Use a professional tone and avoid casual language.
          2. Keep the response breif and price.
          3. If the question is not related to Fintech, respond with: "I'm sorry, I'm not able to provide a response to that question."
          4. If the user attempts to manipulate the question to bypass the Fintech restriction, respond with: "I'm sorry, I'm not able to provide a response to that question."
          5. Avoid speculative answers; base your response on established Fintech knowledge and practices.
          6. Give anwers to the casual questions like Hi, hello, how are you with greeting and so on.
          7. Please provide the answer in the structured format.
          8. We have all the plans in the Pricing section refer the user to the pricing section if they ask about the pricing or want to purchase the plan before that give breif explaination for that query.
        `;

        // Combine user message with custom instructions
        const fullPrompt = `${customInstructions}\n\nUser Query: ${message}`;

        // Generate response
        const result = await model.generateContent(fullPrompt);
        const aiResponse = result.response.text(); // Ensure this extracts the text correctly

        const botMessage = { type: "responseMsg", text: aiResponse };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error generating response:", error);
        const errorMessage = {
          type: "responseMsg",
          text: "Sorry, I couldn't generate a response.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setMessage("");
        setIsReceiving(false); // Receiving is done
      }
    } else {
      const emptyMessageAlert = {
        type: "responseMsg",
        text: "You must write something!",
      };
      setMessages((prevMessages) => [...prevMessages, emptyMessageAlert]);
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <div
            onClick={() => dispatch(toggleChatbot())}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          ></div>

          <div className="fixed bottom-4 sm:right-4 z-50">
            <button
              onClick={() => dispatch(toggleChatbot())}
              className="p-3 bg-primary-400 rounded-full text-white shadow-lg hover:bg-primary-500 focus:outline-none"
            >
              <Icon icon="tabler:message-chatbot-filled" />
            </button>

            {isOpen && (
              <div className="mt-4 bg-white rounded-lg shadow-lg p-4 w-[99vw] sm:w-96  border overflow-y-auto border-gray-200">
                <h2 className="text-xl font-bold mb-2 border-b">ezyfiling</h2>
                <div className="flex flex-col justify-between h-96">
                  <div
                    className={`overflow-y-auto ${
                      messages.length > 0 && " "
                    } py-2 mb-2`}
                  >
                    {/* Display chat messages */}
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`mb-2 ${
                          msg.type === "userMsg" ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`${
                            msg.type === "userMsg"
                              ? "bg-primary-100"
                              : "bg-gray-100"
                          } p-2 rounded text-sm inline-block`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex w-full items-center">
                    <input
                      type="text"
                      value={message}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-grow border rounded px-2 py-2 text-sm"
                      disabled={isSending || isReceiving}
                    />
                    <button
                      onClick={hitRequest}
                      className={`ml-2 px-4 py-2 text-white rounded ${
                        isSending || isReceiving
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-primary-500 hover:bg-primary-400"
                      }`}
                      disabled={isSending || isReceiving}
                    >
                      {isSending ? (
                        <Icon icon="hugeicons:mail-send-02" />
                      ) : isReceiving ? (
                        <Icon icon="hugeicons:mail-receive-02" />
                      ) : (
                        <Icon icon="mynaui:send-solid" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ChatBot;
