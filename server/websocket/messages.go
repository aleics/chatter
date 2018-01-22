package websocket

import (
	"encoding/json"
)

const (
	chatMessageType   = "CHAT"
	configMessageType = "CONFIG"
)

// ChatMessage describes a message of the chat
type ChatMessage struct {
	MsgType string          `json:"type"`
	Data    ChatMessageData `json:"data"`
}

// Serialize a chat message instance
func (m *ChatMessage) serialize() ([]byte, error) {
	return json.Marshal(m)
}

// Deserialize a body message to a chat message instance
func deserializeChatMessage(msgText []byte) (ChatMessage, error) {
	var msg ChatMessage
	if err := json.Unmarshal(msgText, &msg); err != nil {
		return msg, err
	}
	return msg, nil
}

// ChatMessageData contains the information used on a chat message
type ChatMessageData struct {
	Text string `json:"text"`
	User string `json:"user"`
}

// ConfigMessage describes a configuration message send to the host
type ConfigMessage struct {
	MsgType string            `json:"type"`
	Data    ConfigMessageData `json:"data"`
}

// Serialize a chat message instance
func (m *ConfigMessage) serialize() ([]byte, error) {
	return json.Marshal(m)
}

// Deserialize a body message to a chat message instance
func deserializeConfigMessage(msgText []byte) (ConfigMessage, error) {
	var msg ConfigMessage
	if err := json.Unmarshal(msgText, &msg); err != nil {
		return msg, err
	}
	return msg, nil
}

// ConfigMessageData containes the information used on a config message
type ConfigMessageData struct {
	UUID string `json:"uuid"`
}
