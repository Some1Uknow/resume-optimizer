"use client";

import { useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Bot, Loader2, FileText } from "lucide-react";
import { ChatMessage } from "@/types/chat";
import { ANIMATION_VARIANTS } from "@/constants/resume";

const WelcomeOverlay = memo(() => (
  <motion.div
    {...ANIMATION_VARIANTS.welcome}
    className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-b from-gray-50 to-gray-50 dark:from-gray-950 dark:to-gray-950"
  >
    <div className="text-center space-y-6 max-w-lg p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-blue-600 dark:text-blue-300" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to ResumeMax
        </h1>
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-gray-700 dark:text-gray-300"
      >
        Start chatting with our AI assistant to begin building your perfect
        resume. Just type your first message below and watch your resume take
        shape.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex justify-center gap-2">
          <div className="inline-flex h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]"></div>
          <div className="inline-flex h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]"></div>
          <div className="inline-flex h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
        </div>
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
            ? "bg-blue-100 dark:bg-blue-900"
            : "bg-purple-100 dark:bg-purple-900"
        }`}
      >
        {message.role === "user" ? (
          <User className="h-4 w-4 text-blue-600 dark:text-blue-300" />
        ) : (
          <Bot className="h-4 w-4 text-purple-600 dark:text-purple-300" />
        )}
      </div>
      <div>
        {message.parts.map((part, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap text-sm backdrop-blur-md p-4 rounded-2xl shadow-sm ${
              message.role === "user"
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            }`}
          >
            {part.text}
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
    className="bg-white dark:bg-gray-800 shadow-sm p-4 rounded-2xl max-w-[80%] mr-auto flex items-center gap-3 text-sm"
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
      <Loader2 className="h-4 w-4 animate-spin text-purple-600 dark:text-purple-300" />
    </div>
    <span className="text-gray-700 dark:text-gray-300">
      Generating response...
    </span>
  </motion.div>
));

LoadingMessage.displayName = "LoadingMessage";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  hasInteracted: boolean;
}

export const ChatMessages = ({ messages, isGenerating, hasInteracted }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages.length]);

  return (
    <div className="flex-1 relative bg-gray-50 dark:bg-gray-950 min-h-0 overflow-hidden">
      <AnimatePresence>
        {!hasInteracted && <WelcomeOverlay />}
      </AnimatePresence>

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
