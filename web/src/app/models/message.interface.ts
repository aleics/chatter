export type MessageType = 'CHAT' | 'CONFIG';
export const MessageType = {
  chat: 'CHAT' as MessageType,
  config: 'CONFIG' as MessageType
};

export type DataMessage = ChatDataMessage | ConfigDataMessage;

export type GlobalMessage = Message<DataMessage>;

export class Message<T> {
  type: MessageType;
  data: T;

  constructor(type: MessageType, data: T) {
    this.type = type;
    this.data = data;
  }
}

export type ChatMessage = Message<ChatDataMessage>;

export class ChatDataMessage {
  text: string;
  user: string;
}

export type ConfigMessage = Message<ConfigDataMessage>;

export class ConfigDataMessage {
  uuid: string;
}
