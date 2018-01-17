export type ChatEventType = 'OPEN' | 'MSG' | 'CLOSE' | 'ERROR';
export const ChatEventType = {
  open: 'OPEN' as ChatEventType,
  msg: 'MSG' as ChatEventType,
  close: 'CLOSE' as ChatEventType,
  error: 'ERROR' as ChatEventType
};

export type ChatMessage = string;

export interface ChatEvent {
  event: Event;
  type: ChatEventType;
  message?: ChatMessage;
}
