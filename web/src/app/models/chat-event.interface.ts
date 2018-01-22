import { GlobalMessage } from './message.interface';

export type ChatEventType = 'OPEN' | 'MSG' | 'CLOSE' | 'ERROR';
export const ChatEventType = {
  open: 'OPEN' as ChatEventType,
  msg: 'MSG' as ChatEventType,
  close: 'CLOSE' as ChatEventType,
  error: 'ERROR' as ChatEventType
};

export interface ChatEvent {
  event: Event;
  type: ChatEventType;
  message?: GlobalMessage;
}
