"use client";

import { useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Bot, Loader2} from "lucide-react";
import { ChatMessage } from "@/types/chat";
import { ANIMATION_VARIANTS } from "@/constants/resume";
import ReactMarkdown from "react-markdown";

const WelcomeOverlay = memo(({ onSuggestionClick }: { onSuggestionClick?: (suggestion: string) => void }) => (
  <motion.div
    {...ANIMATION_VARIANTS.welcome}
    className="absolute inset-0 flex items-center justify-center z-10"
  >
    <div className="text-center space-y-8 max-w-2xl p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Chat with me to build your resume
        </h1>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mt-12"
      >
        {[
          "Build a Resume for Backend Developer",
          "Build a resume for an AI/ML Engineer",
          "Build a resume for a Full Stack Engineer",
        ].map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick?.(prompt)}
            className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-[13px] border border-gray-200 transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            {prompt}
            <span className="text-gray-500">↗</span>
          </button>
        ))}
      </motion.div>
    </div>
  </motion.div>
));

WelcomeOverlay.displayName = "WelcomeOverlay";

const MessageBubble = memo(
  ({ message, index }: { message: ChatMessage; index: number }) => (
    <motion.div
      key={index}
      {...ANIMATION_VARIANTS.message}
      className={`w-full max-w-[85%] flex items-start gap-3 ${
        message.role === "user"
          ? "ml-auto flex-row-reverse text-right"
          : "mr-auto flex-row text-left"
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-full w-8 h-8 flex-shrink-0 ${
          message.role === "user"
            ? "bg-blue-100"
            : "bg-purple-100"
        }`}
      >
        {message.role === "user" ? (
          <User className="h-4 w-4 text-blue-600" />
        ) : (
          <Bot className="h-4 w-4 text-purple-600" />
        )}
      </div>
      <div>
        {message.parts.map((part, i) => (
          <div
            key={i}
            className={`text-[14px] p-4 rounded-2xl shadow-sm ${
              message.role === "user"
                ? "bg-blue-50 text-blue-900"
                : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            {message.role === "user" ? (
              <div className="whitespace-pre-wrap leading-relaxed">{part.text}</div>
            ) : (
              <div className="leading-relaxed">
                <ReactMarkdown>
                  {part.text}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
);

MessageBubble.displayName = "MessageBubble";

const LoadingMessage = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white text-gray-900 border border-gray-200 shadow-sm p-4 rounded-2xl max-w-[80%] mr-auto flex items-center gap-3 text-[14px]"
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
    </div>
    <span className="text-gray-600">Generating response...</span>
  </motion.div>
));

LoadingMessage.displayName = "LoadingMessage";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  hasInteracted: boolean;
  onSuggestionClick?: (suggestion: string) => void;
}

export const ChatMessages = ({
  messages,
  isGenerating,
  hasInteracted,
  onSuggestionClick,
}: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages.length]);

  return (
    <div className="flex-1 relative bg-[#e8e8e8] min-h-0 overflow-hidden">
      <AnimatePresence>{!hasInteracted && <WelcomeOverlay onSuggestionClick={onSuggestionClick} />}</AnimatePresence>

      <ScrollArea className="h-full w-full">
        <div className="p-6 space-y-6 pb-4 min-h-full">
          {messages?.map((message, index) => (
            <MessageBubble key={index} message={message} index={index} />
          ))}
          {isGenerating && <LoadingMessage />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </div>
  );
};