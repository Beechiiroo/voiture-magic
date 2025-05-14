
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui avec la location de votre véhicule ?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  "Comment réserver une voiture ?",
  "Quels documents sont nécessaires ?",
  "Comment annuler une réservation ?",
  "Quels sont vos tarifs ?",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      let response: string;

      // Simple response logic based on keywords
      const lowercaseInput = inputValue.toLowerCase();
      
      if (lowercaseInput.includes("réserv")) {
        response = "Pour réserver une voiture, vous pouvez utiliser notre formulaire de réservation en ligne ou nous appeler directement au +33 1 23 45 67 89. Nous aurons besoin de vos dates de voyage, le type de véhicule souhaité et vos coordonnées.";
      } else if (lowercaseInput.includes("annul")) {
        response = "Les annulations sont gratuites jusqu'à 48 heures avant le début de votre location. Pour annuler, connectez-vous à votre compte et cliquez sur 'Mes réservations', puis sur 'Annuler'.";
      } else if (lowercaseInput.includes("document") || lowercaseInput.includes("papier")) {
        response = "Pour louer un véhicule, vous aurez besoin de votre permis de conduire valide, une carte d'identité ou passeport, et une carte de crédit à votre nom pour la caution.";
      } else if (lowercaseInput.includes("tarif") || lowercaseInput.includes("prix")) {
        response = "Nos tarifs varient selon le modèle du véhicule et la durée de location. Les prix commencent à partir de 39€/jour pour les petites citadines. Des réductions sont disponibles pour les locations de longue durée.";
      } else {
        response = "Merci pour votre message. Un de nos conseillers va examiner votre demande et vous répondra dans les plus brefs délais. N'hésitez pas à poser d'autres questions entre-temps !";
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="bg-white rounded-xl shadow-2xl mb-4 w-[350px] max-h-[500px] flex flex-col overflow-hidden border border-gray-200"
            >
              {/* Chat header */}
              <div className="bg-rental-600 text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  <h3 className="font-bold">Assistant CarRentalPro</h3>
                </div>
                <button onClick={toggleChat} className="text-white hover:text-gray-200">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.sender === "user" ? "flex justify-end" : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-rental-600 text-white rounded-br-none"
                          : "bg-white shadow-md rounded-bl-none"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-rental-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white p-3 rounded-lg shadow-md rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions */}
              {messages.length <= 2 && (
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Questions fréquentes :</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full transition-colors"
                        onClick={() => handleSuggestedQuestion(question)}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat input */}
              <div className="p-3 bg-white border-t border-gray-200">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Tapez votre message..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rental-500"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button 
                    onClick={handleSend} 
                    className="rounded-l-none bg-rental-600 hover:bg-rental-700"
                    disabled={inputValue.trim() === ""}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat button */}
        <motion.button
          onClick={toggleChat}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white 
          ${isOpen ? 'bg-rental-700' : 'bg-rental-600'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.button>
      </div>
    </>
  );
};

export default Chatbot;
