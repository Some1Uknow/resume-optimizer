export interface ChatMessage {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

export interface InitialChatData {
  messages: ChatMessage[];
  resumeData: any;
}
